import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { GAME_LOBBY_PATH } from "./pagePaths.ts";
import { socket } from "../App.tsx";
import DisplayLogo from "../components/Other/DisplayLogo.tsx";

const defaultDuelsPerMatch: number = 5;
const defaultDuelTime: number = 15;
const defaultMatchTime: number = 120;

const CreateGame = () => {
  const navigate = useNavigate();
  const [duelPerMatch, setDuelsPerMatch] = useState(defaultDuelsPerMatch);
  const [duelTime, setDuelTime] = useState(defaultDuelTime);
  const [matchTime, setMatchTime] = useState(defaultMatchTime);

  const [loading, setLoading] = useState(false);
  const createGame = () => {
    socket.emit("CREATE_GAME", duelPerMatch, duelTime, matchTime);
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
          <div className="flex justify-between items-center w-full">
            <span className="text-white text-2xl uppercase">
              Duels per match
            </span>
            <div className="flex justify-center gap-2 text-transparent font-bold">
              <input
                className="py-2 px-5 bg-[#14171D] text-white border-2 border-white rounded-xl w-1/2"
                value={duelPerMatch}
                onChange={(event) => {
                  setDuelsPerMatch(parseInt(event.target.value));
                }}
              />
              <span>SECS</span>
            </div>
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="text-white text-2xl uppercase">Duels Timer</span>
            <div className="flex justify-center items-center gap-2 text-white font-bold">
              <input
                className="py-2 px-5 bg-[#14171D] text-white border-2 border-white rounded-xl w-1/2"
                value={duelTime}
                onChange={(event) => {
                  setDuelTime(parseInt(event.target.value));
                }}
              />
              <span>SECS</span>
            </div>
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="text-white text-2xl uppercase">Round timer</span>
            <div className="flex justify-center items-center gap-2 text-white font-bold">
              <input
                className="py-2 px-5 bg-[#14171D] text-white border-2 border-white rounded-xl w-1/2"
                value={matchTime}
                onChange={(event) => {
                  setMatchTime(parseInt(event.target.value));
                }}
              />
              <span>SECS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-14 mt-16">
        <button
          className="w-1/4 text-white bg-primary text-2xl font-bold px-7 rounded-xl h-full uppercase"
          onClick={createGame}
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Game"}
        </button>
      </div>
    </div>
  );
};

export default CreateGame;
