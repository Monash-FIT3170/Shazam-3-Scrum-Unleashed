import { useEffect, useState } from "react";
import DisplayLogo from "../components/DisplayLogo";
import WaitingToStart from "../components/WaitingToStart";
import { socket } from "../App";
import ChoosePlayerMove from "../components/ChoosePlayerMove";
import CountDownTimer from "../components/CountDownTimer";
import WinnerPlayer from "../components/WinnerPlayer";
import LoadingEffect from "../components/LoadingEffect";
import { useLocation } from "react-router-dom";


const PlayerScreen = () => {
  const [renderMoveComponent, setRenderMoveComponent] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playerName = searchParams.get("playerName");

  useEffect(() => {
    socket.on("CHOOSE_PLAYER_MOVE", () => {
      setRenderMoveComponent(true);

    socket.on("GAME_WINNER", () => {
        setIsWinner(true); // Set isWinner to true when GAME_WINNER event is received

      });

    socket.on("RE_RENDER_MOVE_COMPONENT", () => {
      setDisplayResults(false);
      setRenderMoveComponent(true);
    });
    
    socket.on("PLAYER_MOVES_MADE", () => {
        setDisplayResults(true);
      });
    });

    socket.on("DRAW", () => {
      setRenderMoveComponent(false);
      setDisplayResults(true);
    
      setTimeout(() => {
        setRenderMoveComponent(true);
        setDisplayResults(false);
      }, 5000); // Wait for 5 seconds before hiding results

    });

    return () => {
      // Clean up socket event listener
      socket.off("CHOOSE_PLAYER_MOVE");
      socket.off("GAME_WINNER");
      socket.off("RE_RENDER_MOVE_COMPONENT");
      socket.off("PLAYER_MOVES_MADE")
      socket.off("DRAW");
      
    };
  }, []);

  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        {((!isWinner && !renderMoveComponent && !displayResults) || isWinner) && (
          <div className=" items-center size-60 w-full">
            <DisplayLogo />
          </div>
        )}
        <div className="flex flex-col items-center justify-center mt-10">
          {!isWinner && !renderMoveComponent && (
            <div className="mt-20">
              <WaitingToStart playerName={playerName} />
            </div>
          )}
          {!isWinner && renderMoveComponent && !displayResults && (
            <div className="mt-20">
              <LoadingEffect isOpponent={true}></LoadingEffect>
              <CountDownTimer />
              <ChoosePlayerMove playerName={playerName} />
            </div>
          )}
          {isWinner && !displayResults && <WinnerPlayer />}
          {displayResults && <LoadingEffect isOpponent={true}></LoadingEffect>}
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
