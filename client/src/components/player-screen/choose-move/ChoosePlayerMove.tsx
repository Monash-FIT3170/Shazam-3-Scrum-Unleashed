import { useState } from "react";
import RockOption from "../../../assets/choose-move/RockOption.svg";
import PaperOption from "../../../assets/choose-move/PaperOption.svg";
import ScissorsOption from "../../../assets/choose-move/ScissorOption.svg";
import { Action, RPSPowerupSpawn } from "../../../../../types/types.ts";
import MoveSelection from "./MoveSelection.tsx";
import { socket } from "../../../App.tsx";
import WaitingForOpponent from "../waiting-screens/WaitingForOpponent.tsx";
import CountDownTimer from "../match-overlay/CountDownTimer.tsx";

interface ChoosePlayerMoveProps {
  tournamentCode: string;
  duelTime: number;
  powerupSpawn: RPSPowerupSpawn | undefined;
}

const ChoosePlayerMove = ({
  tournamentCode,
  duelTime,
  powerupSpawn,
}: ChoosePlayerMoveProps) => {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const handleMoveSelection = (move: Action) => {
    if (!selectedAction) {
      setSelectedAction(move);
      socket.emit("RPS_CHOOSE_ACTION", tournamentCode, socket.userID, move);
    }
  };

  return (
    <>
      <CountDownTimer time={duelTime} />
      {selectedAction !== null ? (
        <WaitingForOpponent moveAction={selectedAction} />
      ) : (
        <>
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center w-full">
            <p className="text-white text-3xl font-bold mb-9">CHOOSE A MOVE</p>
            <div className="flex justify-center items-center">
              <MoveSelection
                img={RockOption}
                selection="ROCK"
                onSelectMove={handleMoveSelection}
                powerup={powerupSpawn ? powerupSpawn.onAction == "ROCK" : false}
              />
              <MoveSelection
                img={PaperOption}
                selection="PAPER"
                onSelectMove={handleMoveSelection}
                powerup={
                  powerupSpawn ? powerupSpawn.onAction == "PAPER" : false
                }
              />
              <MoveSelection
                img={ScissorsOption}
                selection="SCISSORS"
                onSelectMove={handleMoveSelection}
                powerup={
                  powerupSpawn ? powerupSpawn.onAction == "SCISSORS" : false
                }
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChoosePlayerMove;
