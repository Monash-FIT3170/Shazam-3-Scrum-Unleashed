import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { GAME_LOBBY_PATH } from "./pagePaths.ts";
import { socket } from "../App.tsx";
import CreateTournamentInput from "../components/inputs/CreateTournamentInput";
import { CreateTournamentRes } from "../../../types/requestTypes.ts";
import Line2 from "../assets/gamesetup/Line.svg";
import ChooseMatchType from "../components/inputs/ChooseMatchType.tsx";
import { MatchType } from "../../../types/socket/eventArguments.ts";

const defaultDuelsToWin: number = 3;
const defaultDuelTime: number = 15;
const defaultRoundTime: number = 120;

async function postTournament(
  userID: string,
  duelsToWin: number,
  duelTime: number,
  roundTime: number,
) {
  try {
    console.log(JSON.stringify({ userID, duelsToWin, duelTime, roundTime }));
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/create-tournament`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ userID, duelsToWin, duelTime, roundTime }),
      },
    );
    return (await res.json()).body as CreateTournamentRes;
  } catch (error) {
    console.error(error);
  }
}

const CreateTournament = () => {
  const navigate = useNavigate();
  const [duelsToWin, setDuelsToWin] = useState(defaultDuelsToWin);
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
  const [matchType, setMatchType] = useState<MatchType>("RPS");
  const [tournamentCode, setTournamentCode] = useState("");

  useEffect(() => {
    if (loading) {
      navigate(`../${GAME_LOBBY_PATH}?tournamentCode=${tournamentCode}`);
    }
  }, [tournamentCode]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 w-full text-center">
        <div className="uppercase text-white text-6xl font-bold w-full pt-5">
          GAME SETUP
        </div>
        <div className="flex justify-center mt-4">
          <img src={Line2} alt="Line Decoration" className="w-1/3" />
        </div>
      </div>
      <div className="pt-32 flex justify-center">
        <ChooseMatchType setMatchType={setMatchType} />
      </div>
      <div className="flex justify-center mt-10 md:mt-16 lg:mt-16">
        <div className="w-11/12 md:w-3/4 flex flex-col gap-5">
          <CreateTournamentInput
            inputText={"duels per match"}
            placeholder={duelsToWin}
            callback={setDuelsToWin}
            transparentUnits={true}
            errorCallback={changeInputError(0)}
          />
          <CreateTournamentInput
            inputText={"duel timer"}
            placeholder={duelTime}
            callback={setDuelTime}
            transparentUnits={false}
            errorCallback={changeInputError(1)}
          />
          <CreateTournamentInput
            inputText={"round timer"}
            placeholder={roundTime}
            callback={setRoundTime}
            transparentUnits={false}
            errorCallback={changeInputError(2)}
          />
        </div>
      </div>

      <div className="h-14 absolute bottom-30 lg:bottom-10 xl:bottom-30 w-full flex justify-center">
        <button
          className={`w-1/5 text-white ${inputErrors.includes(true) ? "bg-bright-red" : "bg-primary"} text-xl sm:text-2xl font-bold px-7 rounded-xl h-full uppercase`}
          onClick={async () => {
            const code = await postTournament(
              socket.userID,
              duelsToWin,
              duelTime,
              roundTime
            );
            if (code) {
              setTournamentCode(code.tournamentCode);
              setLoading(true);
            }
          }}
          disabled={loading || inputErrors.includes(true)}
        >
          {inputErrors.includes(true)
            ? "Invalid inputs"
            : loading
              ? "Loading..."
              : "CREATE GAME"}
        </button>
      </div>
    </div>
  );
};

export default CreateTournament;
