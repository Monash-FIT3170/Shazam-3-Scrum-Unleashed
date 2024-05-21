import { useState } from "react";
import RockOption from "../../../assets/ChooseMove/RockOption.svg";
import PaperOption from "../../../assets/ChooseMove/PaperOption.svg";
import ScissorsOption from "../../../assets/ChooseMove/ScissorOption.svg";
import { Action } from "../../../../../types/types.ts";
import MoveSelection from "./MoveSelection.tsx";
import { socket } from "../../../App.tsx";
import WaitingForOpponent from "../waiting-screens/WaitingForOpponent.tsx";

interface ChoosePlayerMoveProps {
  tournamentCode: string;
}

const ChoosePlayerMove = ({ tournamentCode }: ChoosePlayerMoveProps) => {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const handleMoveSelection = (move: Action) => {
    if (!selectedAction) {
      setSelectedAction(move);
      console.log(
        `Selected move: ${move}. Emitting CHOOSE_ACTION. ${tournamentCode}`,
      );

      socket.emit("CHOOSE_ACTION", tournamentCode, socket.userID, move);
    }
  };

  return (
    <>
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
              />
              <MoveSelection
                img={PaperOption}
                selection="PAPER"
                onSelectMove={handleMoveSelection}
              />
              <MoveSelection
                img={ScissorsOption}
                selection="SCISSORS"
                onSelectMove={handleMoveSelection}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChoosePlayerMove;
