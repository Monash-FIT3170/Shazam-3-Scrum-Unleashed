import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { GAME_LOBBY_PATH } from "./pagePaths.ts";
import { socket } from "../App.tsx";
import DisplayLogo from "../components/DisplayLogo.tsx";
import CreateGameInput from "../components/inputs/CreateGameInput.tsx";

const defaultDuelsPerMatch: number = 5;
const defaultDuelTime: number = 15;
const defaultRoundTime: number = 120;

const CreateGame = () => {
  const navigate = useNavigate();
  const [duelPerMatch, setDuelsPerMatch] = useState(defaultDuelsPerMatch);
  const [duelTime, setDuelTime] = useState(defaultDuelTime);
  const [roundTime, setRoundTime] = useState(defaultRoundTime);
  const [inputErrors, setInputError] = useState([false, false, false]);

  const changeInputError = (index: number) => (bool: boolean) => {
    const newInputErrors = inputErrors.map((val, i) =>
      i === index ? bool : val,
    );
    setInputError(newInputErrors);
  };

  const [loading, setLoading] = useState(false);
  const createGame = () => {
    socket.emit("CREATE_GAME", duelPerMatch, duelTime, roundTime);
  };

  const [gameCode, setGameCode] = useState("");
  socket.on("GAME_CREATED", (gameCode) => {
    setGameCode(gameCode);
    setLoading(true);
  });

  useEffect(() => {
    if (loading) {
      navigate(`../${GAME_LOBBY_PATH}?gameCode=${gameCode}`);
    }
  }, [gameCode]);

  return (
    <div>
      <div className="w-full flex flex-row justify-start items-center py-10 px-10 gap-10">
        <div className="w-32">
          <DisplayLogo />
        </div>
      </div>

      <div className="uppercase bg-[#1B074A] py-3 px-3 text-white text-3xl w-full">
        Game setup
      </div>

      <div className="pt-5 flex justify-center">
        <div className="w-11/12 md:w-3/4 flex justify-center flex-col gap-3">
          <CreateGameInput
            inputText={"duels per match"}
            placeholder={duelPerMatch}
            callback={setDuelsPerMatch}
            transparentUnits={true}
            errorCallback={changeInputError(0)}
          />
          <CreateGameInput
            inputText={"duel timer"}
            placeholder={duelTime}
            callback={setDuelTime}
            transparentUnits={false}
            errorCallback={changeInputError(1)}
          />
          <CreateGameInput
            inputText={"round timer"}
            placeholder={roundTime}
            callback={setRoundTime}
            transparentUnits={false}
            errorCallback={changeInputError(2)}
          />
        </div>
      </div>

      <div className="h-14 mt-16">
        <button
          className={`w-1/4 text-white ${inputErrors.includes(true) ? "bg-bright-red" : "bg-primary"} text-2xl font-bold px-7 rounded-xl h-full uppercase`}
          onClick={createGame}
          disabled={loading || inputErrors.includes(true)}
        >
          {inputErrors.includes(true)
            ? "Invalid inputs"
            : loading
              ? "Loading..."
              : "Create Game"}
        </button>
      </div>
    </div>
  );
};

export default CreateGame;
