import DisplayLogo from "../components/DisplayLogo.tsx";

import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../App.tsx";
import PlayerCard from "../components/PlayerCard.tsx";
import Player from "../../../server/model/actors/player.ts";
import { TOURNAMENT_SCREEN } from "./pagePaths.ts";

const GameLobby = () => {
  const navigate = useNavigate();
  const gameData = useLoaderData() as { gameCode: string; qrCode: string };

  // changed from player attributes to player so the component for player cards can be used 
  const [players, setPlayers] = useState(new Array<Player>());

  const updateList = (player: Player) => {
    setPlayers((previousPlayers) => [...previousPlayers, player]);
  };

  useEffect(() => {
    socket.on("PLAYER_HAS_JOINED", (player) => {
      console.log(player);
      const newPlayer = new Player(player.socketId, player.name, player.id, player.isBot);
      updateList(newPlayer);
      console.log(`Player ${player.name} has joined`);
    });

    return () => {
      socket.off("PLAYER_HAS_JOINED");
    };
  }, []);

  const startGame = () => {
    socket.emit("START_GAME", gameData.gameCode);
    navigate(`../${TOURNAMENT_SCREEN}?gameCode=${gameData.gameCode}`)
  };

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <h1 className="text-white text-2xl font-bold mt-6 uppercase">Game Code : {gameData.gameCode}</h1>
      <br></br>
      {/* creating a button which starts the game */}
      <button className="w-1/4 text-white bg-primary text-2xl font-bold px-7 rounded-xl h-full uppercase"
          onClick={startGame}
        >Start Game</button>
      <br></br>
      <br></br>
      <div className="player-bar">
        <a>Players: {players.length}</a>
      </div>
      <br></br>
      <div className="player-list">
        {/* creating a playercard component for each player */}
        {players.map((player) => (
          <PlayerCard key={player.getId()} player={player} />
        ))}
      </div>
    </div>
  );
};

export default GameLobby;
