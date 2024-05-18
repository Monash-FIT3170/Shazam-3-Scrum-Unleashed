import DisplayLogo from "../components/DisplayLogo.tsx";

import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../types/types.ts";
import { socket } from "../App.tsx";
import { BASE_PATH, JOIN_GAME_PATH } from "./pagePaths.ts";

async function fetchQrCode(
  returnUrl: string,
  setQrCode: (qrCode: string) => void
) {
  const qrcode = await fetch(
    // TODO: Make this an environment variable
    "http://localhost:3010/qr-code/" + encodeURIComponent(returnUrl)
  );
  const qrCode = await qrcode.json();
  setQrCode(qrCode.qrCode);
}

const GameLobby = () => {
  const gameData = useLoaderData() as { gameCode: string };
  const [players, setPlayers] = useState(new Array<PlayerAttributes>());
  const [qrCode, setQrCode] = useState("");
  // const navigate = useNavigate();

  useEffect(
    () =>
      void fetchQrCode(
        `${window.location.origin}/${BASE_PATH}/${JOIN_GAME_PATH}?gameCode=${gameData.gameCode}`,
        setQrCode
      ),
    []
  );

  const updateList = (player: PlayerAttributes) => {
    setPlayers((previousPlayers) => [...previousPlayers, player]);
  };

  const handleAllocatePlayers = () => {
    // Call the ALLOCATE_PLAYERS socket event
    socket.emit("START_TOURNAMENT", gameData.gameCode);
  };

  useEffect(() => {
    socket.on("PLAYER_HAS_JOINED", (player) => {
      console.log(player);
      updateList(player);
      console.log(`Player ${player.name} has joined`);
    });

    socket.on("TOURNAMENT_STARTED", () => {
      console.log("Tournament Started");
    });

    return () => {
      socket.off("PLAYER_HAS_JOINED");
      socket.off("TOURNAMENT_STARTED");
    };
  }, []);

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <h1 className="text-white font-bold mt-6 uppercase">
        Game Code : {gameData.gameCode}
        <ul>
          {players.map((player) => (
            <li key={player.userID}>{player.name}</li>
          ))}
        </ul>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleAllocatePlayers}
        >
          Allocate Players
        </button>
      </h1>
      {qrCode === "" ? (
        <span>loading...</span>
      ) : (
        <img src={qrCode} alt="QR Code" />
      )}
    </div>
  );
};

export default GameLobby;
