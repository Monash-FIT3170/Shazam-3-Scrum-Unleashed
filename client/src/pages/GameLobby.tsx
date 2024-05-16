import DisplayLogo from "../components/DisplayLogo.tsx";

import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../types/types.ts";
import { socket } from "../App.tsx";

const GameLobby = () => {
  const gameData = useLoaderData() as { gameCode: string; qrCode: string };

  const [players, setPlayers] = useState(new Array<PlayerAttributes>());

  const updateList = (player: PlayerAttributes) => {
    setPlayers((previousPlayers) => [...previousPlayers, player]);
  };
  const handleAllocatePlayers = () => {
    // Call the ALLOCATE_PLAYERS socket event
    socket.emit("ALLOCATE_PLAYERS", gameData.gameCode);
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleAllocatePlayers}
        >
          Allocate Players
        </button>
      </h1>
    </div>
  );
};

export default GameLobby;
