import { useEffect, useState } from "react";
import DisplayLogo from "../components/DisplayLogo";
import WaitingToStart from "../components/WaitingToStart";
import { socket } from "../App";
import ChoosePlayerMove from "../components/ChoosePlayerMove";
import CountDownTimer from "../components/CountDownTimer";

const PlayerScreen = () => {

  const [shouldRenderComponents, setShouldRenderComponents] = useState(false);

  useEffect(() => {
    socket.on("CHOOSE_PLAYER_MOVE", () => {
      setShouldRenderComponents(true);
    });

    return () => {
      // Clean up socket event listener
      socket.off("CHOOSE_PLAYER_MOVE");
    };
  }, []);

  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        <div className=" items-center size-60 w-full">
          <DisplayLogo />
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          {!shouldRenderComponents && (
            <div className="mt-20">
              <WaitingToStart />
            </div>
          )}
          {shouldRenderComponents && (
            <div className="mt-20">
              <CountDownTimer />
              <ChoosePlayerMove />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
