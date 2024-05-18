import { useEffect, useState } from "react";
import DisplayLogo from "../components/DisplayLogo";
import WaitingToStart from "../components/WaitingToStart";
import { socket } from "../App";
import Player from "../../../server/model/actors/player";
import DuelMove from "../components/Duel/DuelMove";
// import ChoosePlayerMove from "../components/ChoosePlayerMove";
// import CountDownTimer from "../components/CountDownTimer";
// import WinnerPlayer from "../components/WinnerPlayer";

const PlayerScreen = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.on("MATCH_STARTED", (players) => {
      setPlayers(players);
      console.log(players)
    });

    return () => {
      // Clean up socket event listener
    };
  }, []);

  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        {/* <div className=" items-center size-60 w-full">
          <DisplayLogo />
        </div> */}
        <div className="flex flex-col items-center justify-center mt-10">
          {/* {players?.length === 0 && <WaitingToStart />} */}
          {/* <WinnerPlayer />
          <CountDownTimer />
          <ChoosePlayerMove />  
           */}
          <DuelMove player1={players[0]} player2={players[1]}></DuelMove>
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
