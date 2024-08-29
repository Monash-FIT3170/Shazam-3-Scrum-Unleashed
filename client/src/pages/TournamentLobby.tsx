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
import { SpectateMatchRes } from "../../../types/requestTypes.ts";

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

async function postSpectateMatch(
  hostID: string,
  tournamentCode: string,
  playerUserID: string,
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/spectate-match`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ hostID, tournamentCode, playerUserID }),
    },
  );

  return (await res.json()).body as SpectateMatchRes;
}

async function postStopSpectating(
  hostID: string,
  tournamentCode: string,
  playerUserID: string,
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/stop-spectating`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ hostID, tournamentCode, playerUserID }),
    },
  );

  return res.ok;
}

const TournamentLobby = () => {
  const { tournamentCode } = useLoaderData() as { tournamentCode: string };
  const [players, setPlayers] = useState<PlayerAttributes[]>([]);
  const [qrCode, setQrCode] = useState("");
  const [inProgress, setTournamentStarted] = useState(false);
  const [tournamentWinner, setTournamentWinner] = useState<string | undefined>(
    undefined,
  );
  const [isSpectating, setIsSpectating] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<SpectateMatchRes | undefined>(
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
    if (!inProgress && players.length > 1) {
      setTournamentStarted(
        await postStartTournament(socket.userID, tournamentCode),
      );
    }
  };

  /*  const quitTournament = () => {
    if (!inProgress) {
      socket.emit("QUIT_TOURNAMENT", tournamentCode, socket.userID);
      window.location.href = "/"; // Navigate to the home page
    }
  };*/

  const spectatePlayer = async (player: PlayerAttributes) => {
    const spectateMatchRes = await postSpectateMatch(
      socket.userID,
      tournamentCode,
      player.userID,
    );
    if (spectateMatchRes) {
      setIsSpectating(true);
      setMatchData(spectateMatchRes);
    }
  };

  const stopSpectating = async (specUserID: string) => {
    if (
      isSpectating &&
      (await postStopSpectating(socket.userID, tournamentCode, specUserID))
    ) {
      setIsSpectating(false);
    }
  };

  useEffect(() => {
    socket.on("TOURNAMENT_STATE", (players, inProgress) => {
      setPlayers(players);
      setTournamentStarted(inProgress);
    });

    socket.on("TOURNAMENT_COMPLETE", (tournamentWinner) => {
      setTournamentWinner(tournamentWinner);
    });

    return () => {
      socket.off("TOURNAMENT_STATE");
      socket.off("TOURNAMENT_COMPLETE");
    };
  }, []);

  return isSpectating && matchData !== undefined ? (
    <div>
      <HostSpectatorScreen
        matchData={matchData}
        tournamentCode={tournamentCode}
        stopSpectating={stopSpectating}
      />
    </div>
  ) : (
    <div>
      {tournamentWinner !== undefined ? (
        <TournamentWin playerName={tournamentWinner} />
      ) : (
        <div>
          {inProgress ? (
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
            {!inProgress && (
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
              <PlayerCard
                player={player}
                cardNum={index}
                key={player.userID}
                interact={() => spectatePlayer(player)}
              />
            ))}
          </div>
        </div>
      )}
      {/*<div className="fixed bottom-10 md:left-20 left-5">*/}
      {/*  <ButtonComponent*/}
      {/*    linkPath="/"*/}
      {/*    text={"Quit Tournament"}*/}
      {/*    onClick={quitTournament}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default TournamentLobby;