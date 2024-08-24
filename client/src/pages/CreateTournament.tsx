import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { GAME_LOBBY_PATH } from "./pagePaths.ts";
import { socket } from "../App.tsx";
import CreateTournamentInput from "../components/inputs/CreateTournamentInput";
import { CreateTournamentRes } from "../../../types/requestTypes.ts";
import Line2 from "../assets/gamesetup/Line.svg";
import Lightning from "../assets/logo/Lightning.svg"
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
  matchType: MatchType[],
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/create-tournament`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userID,
          duelsToWin,
          duelTime,
          roundTime,
          matchType,
        }),
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
  const [matchType, setMatchType] = useState<MatchType[]>(["RPS"]);

  const changeInputError = (index: number) => (bool: boolean) => {
    const newInputErrors = inputErrors.map((val, i) =>
      i === index ? bool : val,
    );
    setInputError(newInputErrors);
  };

  const [loading, setLoading] = useState(false);
  const [tournamentCode, setTournamentCode] = useState("");

  useEffect(() => {
    if (loading) {
      navigate(`../${GAME_LOBBY_PATH}?tournamentCode=${tournamentCode}`);
    }
  }, [tournamentCode]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 w-full text-center my-3">
        <div className="uppercase text-white text-6xl w-full justify-center items-top font-bold pt-5 flex">
          <img src={Lightning} className="w-10"></img>
          GAME SETUP
          <img src={Lightning} className="w-10"></img>
        </div>
        <div className="flex justify-center mt-4">
          <img src={Line2} alt="Line Decoration" className="w-1/3" />
        </div>
      </div>
      <div className="pt-36 flex justify-center">
        <ChooseMatchType setMatchType={setMatchType} />
      </div>
      <div className="flex justify-center mt-10 md:mt-16 lg:mt-16 w-full">
        <div className="w-full md:w-3/4 lg:ml-96 flex flex-col gap-4">
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
              roundTime,
              matchType,
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
