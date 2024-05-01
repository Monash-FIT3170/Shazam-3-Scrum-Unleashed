import DisplayLogo from "../components/DisplayLogo";
import { useState } from "react";

import { socket } from "../App.tsx";

const HostGame = () => {
  const [hostName, setHostName] = useState("");

  const createGame = () => {
    socket.emit("CREATE_GAME", hostName);
  };

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <div>
        <h1 className="text-white font-bold mt-6 uppercase"> name</h1>
        <div className="w-screen">
          <input
            type="text"
            placeholder="HOST NAME"
            className="bg-primary-dark text-white rounded-xl w-1/3 h-10 mt-4 border-2 border-white pl-2"
            onChange={(event) => {
              setHostName(event.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="w-screen h-12 mt-8">
        <button
          className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full"
          onClick={createGame}
        >
          Create Game
        </button>
      </div>
    </div>
  );
};

export default HostGame;
