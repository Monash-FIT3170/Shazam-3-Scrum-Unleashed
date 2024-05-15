import DisplayLogo from "../components/Other/DisplayLogo.tsx";
import { useEffect, useState } from "react";

import { socket } from "../App.tsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import { PLAYER_SCREEN } from "./pagePaths.ts";

type JoinState = "NoCurrentRequest" | "Waiting" | "Joining";

const JoinGame = () => {
  const urlGameCode = useLoaderData() as string;
  const navigate = useNavigate();

  const [gameCode, setGameCode] = useState(urlGameCode);
  const [playerName, setPlayerName] = useState("");
  const [joinState, setJoinState] = useState<JoinState>("NoCurrentRequest");

  const joinGame = () => {
    if (gameCode.length === 0) {
      console.error("No game code was provided. TODO - Handle this error");
      return;
    }

    setJoinState("Waiting");
    socket.emit("JOIN_GAME", gameCode, playerName);
  };

  socket.on("JOINED_GAME", (joinErrorCode) => {
    switch (joinErrorCode) {
      case "SUCCESS":
        setJoinState("Joining");
        break;
      case "NAME_TAKEN":
        // TODO Indication that Name is Taken
        setJoinState("NoCurrentRequest");
        break;
      case "INVALID_GAME_CODE":
        // TODO Indication that Game Code was invalid
        setJoinState("NoCurrentRequest");
        break;
    }
  });

  useEffect(() => {
    if (joinState === "Joining") {
      navigate(`../${PLAYER_SCREEN}?playerName=${playerName}`);
    }
  }, [joinState]);

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
            value={gameCode}
            onChange={(event) => {
              setGameCode(event.target.value);
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
          disabled={joinState !== "NoCurrentRequest"}
        >
          {joinState !== "NoCurrentRequest" ? "Loading..." : "Join Room"}
        </button>
      </div>
    </div>
  );
};

export default JoinGame;
