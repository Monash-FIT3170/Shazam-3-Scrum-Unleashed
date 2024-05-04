import DisplayLogo from "../components/DisplayLogo";
import { useEffect, useState } from "react";

import { socket } from "../App.tsx";
import { useNavigate } from "react-router-dom";
import { PLAYER_SCREEN } from "./pagePaths.ts";

const JoinGame = () => {
  const navigate = useNavigate();

  const [gameCode, setTournamentCode] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [loading, setLoading] = useState(false);
  const joinGame = () => {
    console.log("trying to join");
    socket.emit("JOIN_GAME", gameCode, playerName);
  };
  const [successfulJoin, setSuccessfulJoin] = useState(false);
  socket.on("JOINED_GAME", () => {
    setLoading(false);
    setSuccessfulJoin(true);
  });

  socket.on("INVALID_GAME_CODE", () => {
    setLoading(false);
    setSuccessfulJoin(false);
  });

  socket.on("PLAYER_NAME_TAKEN", () => {
    setLoading(false);
    setSuccessfulJoin(false);
  });

  useEffect(() => {
    if (successfulJoin) {
      navigate(`../${PLAYER_SCREEN}?playerName=${playerName}`);
    }
  }, [successfulJoin]);

  return (
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
          disabled={loading}
        >
          {loading ? "Loadings..." : "Join Room"}
        </button>
      </div>
    </div>
  );
};

export default JoinGame;
