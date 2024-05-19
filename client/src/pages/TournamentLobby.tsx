import DisplayLogo from "../components/DisplayLogo.tsx";

import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../types/types.ts";
import { socket } from "../App.tsx";
import { BASE_PATH, JOIN_GAME_PATH } from "./pagePaths.ts";
import PlayerCard from "../components/PlayerCard.tsx";
import lightning from "../assets/Lightning.svg";
import TournamentLobbyBanner from "../components/lobby/TournamentLobbyBanner.tsx";

async function fetchQrCode(
  returnUrl: string,
  setQrCode: (qrCode: string) => void,
) {
  const qrcode = await fetch(
    // TODO: Make this an environment variable
    "http://localhost:3010/qr-code/" + encodeURIComponent(returnUrl),
  );
  const qrCode = await qrcode.json();
  setQrCode(qrCode.qrCode);
}

const TournamentLobby = () => {
  const { tournamentCode } = useLoaderData() as { tournamentCode: string };
  const [players, setPlayers] = useState<PlayerAttributes[]>([]);
  const [qrCode, setQrCode] = useState("");

  useEffect(
    () =>
      void fetchQrCode(
        `${window.location.origin}/${BASE_PATH}/${JOIN_GAME_PATH}?tournamentCode=${tournamentCode}`,
        setQrCode,
      ),
    [],
  );


  const startTournament = () => {
    socket.emit("START_TOURNAMENT", tournamentCode);
  };

  useEffect(() => {
    socket.on("PLAYERS_UPDATE", (players) => {
      console.log(players);
      setPlayers(players);
    });

    socket.on("ROUND_STARTED", () => {
      console.log("Tournament Started");
    });

    return () => {
      socket.off("PLAYERS_UPDATE");
      socket.off("ROUND_STARTED");
    };
  }, []);

  return (
    <div>
      <TournamentLobbyBanner tournamentCode={tournamentCode} qrCode={qrCode}/>

      <div className="player-bar flex flex-row justify-between items-center px-10 h-16">
        <div className="text-white text-xl uppercase ">
          Players: {players.length}
        </div>

        <button
          className="hover:bg-blue-700 text-white bg-primary text-xl rounded-xl h-full uppercase w-1/4"
          onClick={startTournament}
        >
          Start Tournament
        </button>
      </div>

      <div className="player-list">
        {players.map((player, index) => (
          <PlayerCard key={player.userID} player={player} cardNum={index} />
        ))}
      </div>
    </div>
  );
};

export default TournamentLobby;
