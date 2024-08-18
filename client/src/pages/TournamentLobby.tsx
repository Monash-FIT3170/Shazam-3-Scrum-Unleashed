import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../types/types.ts";
import { socket } from "../App.tsx";
import { JOIN_GAME_PATH } from "./pagePaths.ts";
import PlayerCard from "../components/lobby/PlayerCard.tsx";
import TournamentLobbyBanner from "../components/lobby/TournamentLobbyBanner.tsx";
import TournamentBracketBanner from "../components/lobby/TournamentBracketBanner.tsx";
import TournamentWin from "../components/player-screen/tournament-win/TournamentWin.tsx";
import HostSpectatorScreen from "../components/lobby/HostSpectatorScreen.tsx";

async function fetchQrCode(
  returnUrl: string,
  setQrCode: (qrCode: string) => void,
) {
  const qrcode = await fetch(
    `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3010"}/qr-code/${encodeURIComponent(returnUrl)}`,
  );
  const qrCode = await qrcode.json();
  setQrCode(qrCode.qrCode);
}

async function postStartTournament(userID: string, tournamentCode: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/start-tournament`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userID, tournamentCode }),
    },
  );

  return res.ok;
}

const TournamentLobby = () => {
  const { tournamentCode } = useLoaderData() as { tournamentCode: string };
  const [players, setPlayers] = useState<PlayerAttributes[]>([]);
  const [qrCode, setQrCode] = useState("");
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [tournamentWinner, setTournamentWinner] = useState<string | undefined>(
    undefined,
  );
  const [spectatingUserID, setSpectatingUserID] = useState<string | undefined>(
    undefined,
  );

  useEffect(
    () =>
      void fetchQrCode(
        `${window.location.origin}/${JOIN_GAME_PATH}?tournamentCode=${tournamentCode}`,
        setQrCode,
      ),
    [],
  );

  const startTournament = async () => {
    if (!tournamentStarted) {
      setTournamentStarted(
        await postStartTournament(socket.userID, tournamentCode),
      );
    }
  };

  const spectatePlayer = (player: PlayerAttributes) => {
    setSpectatingUserID(player.userID);
    socket.emit(
      "SPECTATE_PLAYER",
      socket.userID,
      tournamentCode,
      player.userID,
    );
  };

  useEffect(() => {
    socket.on("PLAYERS_UPDATE", (players) => {
      setPlayers(players);
    });

    socket.on("TOURNAMENT_COMPLETE", (tournamentWinner) => {
      setTournamentWinner(tournamentWinner);
    });

    return () => {
      socket.off("PLAYERS_UPDATE");
      socket.off("TOURNAMENT_COMPLETE");
    };
  }, []);

  return spectatingUserID !== undefined ? (
    <HostSpectatorScreen
      tournamentCode={tournamentCode}
      targetUserID={spectatingUserID}
    />
  ) : (
    <div>
      {tournamentWinner !== undefined ? (
        <TournamentWin playerName={tournamentWinner} />
      ) : (
        <div>
          {tournamentStarted ? (
            <TournamentBracketBanner />
          ) : (
            <TournamentLobbyBanner
              tournamentCode={tournamentCode}
              qrCode={qrCode}
            />
          )}

          <div className="player-bar flex flex-row justify-between items-center px-10 h-16">
            <div className="text-white text-xl uppercase ">
              Players: {players.length}
            </div>
            {!tournamentStarted && (
              <button
                className="hover:bg-blue-700 text-white bg-primary text-xl rounded-xl h-full uppercase w-1/4"
                onClick={startTournament}
              >
                Start Tournament
              </button>
            )}
          </div>

          <div className="player-list" data-testid="player-list">
            {players.map((player, index) => (
                <PlayerCard player={player} cardNum={index} key={player.userID} interact={() => spectatePlayer(player)}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentLobby;
