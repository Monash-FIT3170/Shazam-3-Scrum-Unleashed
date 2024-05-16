import { useEffect, useState } from "react";
import DisplayLogo from "../components/DisplayLogo";
import WaitingToStart from "../components/WaitingToStart";
import { socket } from "../App";
import ChoosePlayerMove from "../components/ChoosePlayerMove";
import CountDownTimer from "../components/CountDownTimer";
import WinnerPlayer from "../components/WinnerPlayer";

const PlayerScreen = () => {
  const [shouldRenderComponents, setShouldRenderComponents] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    socket.on("CHOOSE_PLAYER_MOVE", () => {
      setShouldRenderComponents(true);

      socket.on("GAME_WINNER", () => {
        setIsWinner(true); // Set isWinner to true when GAME_WINNER event is received
      });
    });

    return () => {
      // Clean up socket event listener
      socket.off("CHOOSE_PLAYER_MOVE");
      socket.off("GAME_WINNER");
    };
  }, []);

  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        <div className=" items-center size-60 w-full">
          <DisplayLogo />
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          {!isWinner && !shouldRenderComponents && (
            <div className="mt-20">
              <WaitingToStart />
            </div>
          )}
          {!isWinner && shouldRenderComponents && (
            <div className="mt-20">
              <CountDownTimer />
              <ChoosePlayerMove />
            </div>
          )}
          {isWinner && <WinnerPlayer />}
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
