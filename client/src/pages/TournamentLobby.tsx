import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../types/types.ts";
import { socket } from "../App.tsx";
import { JOIN_GAME_PATH } from "./pagePaths.ts";
import PlayerCard from "../components/lobby/PlayerCard.tsx";
import TournamentLobbyBanner from "../components/lobby/TournamentLobbyBanner.tsx";
import TournamentBracketBanner from "../components/lobby/TournamentBracketBanner.tsx";
import TournamentWin from "../components/player-screen/tournament-win/TournamentWin.tsx";

async function fetchQrCode(
  returnUrl: string,
  setQrCode: (qrCode: string) => void
) {
  const qrcode = await fetch(
    // TODO: Make this an environment variable
    `${import.meta.env.VITE_API_BASE_URL}/qr-code/${encodeURIComponent(returnUrl)}`
  );
  const qrCode = await qrcode.json();
  setQrCode(qrCode.qrCode);
}

const TournamentLobby = () => {
  const { tournamentCode } = useLoaderData() as { tournamentCode: string };
  const [players, setPlayers] = useState<PlayerAttributes[]>([]);
  const [qrCode, setQrCode] = useState("");
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [tournamentWinner, setTournamentWinner] = useState<string | undefined>(
    undefined
  );

  useEffect(
    () =>
      void fetchQrCode(
        `${window.location.origin}/${JOIN_GAME_PATH}?tournamentCode=${tournamentCode}`,
        setQrCode,
      ),
    []
  );

  const startTournament = () => {
    if (!tournamentStarted) {
      socket.emit("START_TOURNAMENT", tournamentCode);
      setTournamentStarted(true);
    }
  };

  useEffect(() => {
    socket.on("PLAYERS_UPDATE", (players) => {
      console.log(players);
      setPlayers(players);
    });

    socket.on("TOURNAMENT_COMPLETE", (tournamentWinner) => {
      console.log(players);
      setTournamentWinner(tournamentWinner);
    });

    return () => {
      socket.off("PLAYERS_UPDATE");
    };
  }, []);

  return (
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
              <PlayerCard key={player.userID} player={player} cardNum={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentLobby;
