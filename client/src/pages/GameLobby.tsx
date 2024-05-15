import DisplayLogo from "../components/DisplayLogo.tsx";

import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../types/types.ts";
import { socket } from "../App.tsx";

const GameLobby = () => {
  const gameData = useLoaderData() as { gameCode: string; qrCode: Blob };

  const img = URL.createObjectURL(gameData.qrCode);

  const [players, setPlayers] = useState(new Array<PlayerAttributes>());

  const updateList = (player: PlayerAttributes) => {
    setPlayers((previousPlayers) => [...previousPlayers, player]);
  };

  useEffect(() => {
    socket.on("PLAYER_HAS_JOINED", (player) => {
      console.log(player);
      updateList(player);
      console.log(`Player ${player.name} has joined`);
    });

    return () => {
      socket.off("PLAYER_HAS_JOINED");
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
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </h1>
      <img src={img} alt="QR Code" />
    </div>
  );
};

export default GameLobby;
