import DisplayLogo from "../components/DisplayLogo";
import { useEffect, useState } from "react";

import { socket } from "../App.tsx";
import PlayerScreen from "./PlayerScreen.tsx";
import { PlayerAttributes } from "../../../types/types.ts";

const JoinGame = () => {
  const [gameCode, setTournamentCode] = useState("");
  const [playerName, setPlayerName] = useState("");

  const joinGame = () => {
    socket.emit("JOIN_GAME", gameCode, playerName);
  };

  const [gameCodeCreated, setGameCode] = useState("");
  const [player, setPlayer] = useState<PlayerAttributes>();
  useEffect(() => {
    socket.on("JOINED_GAME", (player, gameCode) => {
      setPlayer(player);
      setGameCode(gameCode);
    });
  }, [socket]);

  return player != undefined ? (
    PlayerScreen(gameCodeCreated, player)
  ) : (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <div>
        <h1 className="text-white font-bold mt-6 uppercase">
          Enter Tournament Code
        </h1>
        <div className="w-screen">
          <input
            type="text"
            placeholder="6 DIGIT ROOM CODE"
            className="bg-primary-dark text-white rounded-xl w-1/3 h-10 mt-4 border-2 border-white pl-2"
            onChange={(event) => {
              setTournamentCode(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <div>
        <h1 className="text-white font-bold mt-6 uppercase"> name</h1>
        <div className="w-screen">
          <input
            type="text"
            placeholder="NAME"
            className="bg-primary-dark text-white rounded-xl w-1/3 h-10 mt-4 border-2 border-white pl-2"
            onChange={(event) => {
              setPlayerName(event.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="w-screen h-12 mt-8">
        <button
          className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full"
          onClick={joinGame}
        >
          JOIN ROOM
        </button>
      </div>
    </div>
  );
};

export default JoinGame;
