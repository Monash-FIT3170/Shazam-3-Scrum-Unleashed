import DisplayLogo from "../components/DisplayLogo.tsx";

import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../App.tsx";
import PlayerCard from "../components/PlayerCard.tsx";
import Player from "../../../server/model/actors/player.ts";
import { TOURNAMENT_SCREEN, BASE_PATH, JOIN_GAME_PATH } from "./pagePaths.ts";

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

const GameLobby = () => {
  const navigate = useNavigate();
  const gameData = useLoaderData() as { gameCode: string };
  // changed from player attributes to player so the component for player cards can be used
  const [players, setPlayers] = useState(new Array<Player>());
  const [qrCode, setQrCode] = useState("");

  useEffect(
    () =>
      void fetchQrCode(
        `${window.location.origin}/${BASE_PATH}/${JOIN_GAME_PATH}?gameCode=${gameData.gameCode}`,
        setQrCode,
      ),
    [],
  );

  const updateList = (player: Player) => {
    setPlayers((previousPlayers) => [...previousPlayers, player]);
  };
  const handleAllocatePlayers = () => {
    // Call the ALLOCATE_PLAYERS socket event
    socket.emit("ALLOCATE_PLAYERS", gameData.gameCode);
  };

  useEffect(() => {
    socket.on("PLAYER_HAS_JOINED", (player) => {
      console.log(player);
      const newPlayer = new Player(
        player.socketId,
        player.name,
        player.id,
        player.isBot,
      );
      updateList(newPlayer);
      console.log(`Player ${player.name} has joined`);
    });

    return () => {
      socket.off("PLAYER_HAS_JOINED");
    };
  }, []);

  const startGame = () => {
    socket.emit("START_GAME", gameData.gameCode);
    navigate(`../${TOURNAMENT_SCREEN}?gameCode=${gameData.gameCode}`);
  };

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <h1 className="text-white text-2xl font-bold mt-6 uppercase">
        Game Code : {gameData.gameCode}
      </h1>
      <br></br>
      {/* creating a button which starts the game */}
      <button
        className="hover:bg-blue-700 text-white bg-primary text-2xl font-bold py-3 px-4 rounded-xl h-full uppercase"
        onClick={startGame}
      >
        Start Game
      </button>
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleAllocatePlayers}
      >
        Allocate Players
      </button>
      {qrCode === "" ? (
        <span>loading...</span>
      ) : (
        <img src={qrCode} alt="QR Code" />
      )}
    </div>
  );
};

export default GameLobby;
