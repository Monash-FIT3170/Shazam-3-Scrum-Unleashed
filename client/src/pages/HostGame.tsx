import DisplayLogo from "../components/DisplayLogo";
import { useState } from "react";

import { Link, useNavigation } from "react-router-dom";
import { GAME_LOBBY_PATH } from "./pagePaths.ts";

const HostGame = () => {
  const [hostName, setHostName] = useState("");

  const navigation = useNavigation();

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
        {navigation.state === "loading" ? (
          <button className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full">
            Loading...
          </button>
        ) : (
          <Link to={`../${GAME_LOBBY_PATH}?name=${hostName}`}>
            <button className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full">
              Create Game
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default HostGame;
