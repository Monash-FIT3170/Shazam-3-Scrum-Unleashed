import { useState } from "react";
import RockOption from "../../../assets/choose-move/RockOption.svg";
import PaperOption from "../../../assets/choose-move/PaperOption.svg";
import ScissorsOption from "../../../assets/choose-move/ScissorOption.svg";
import { Action } from "../../../../../types/types.ts";
import MoveSelection from "./MoveSelection.tsx";
import { socket } from "../../../App.tsx";
import WaitingForOpponent from "../waiting-screens/WaitingForOpponent.tsx";
import { Selection } from "../../../../../types/types.ts";

interface ChoosePlayerMoveProps {
  tournamentCode: string;
}

const ChoosePlayerMove = ({ tournamentCode }: ChoosePlayerMoveProps) => {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const handleMoveSelection = (move: Selection) => {
    if (!selectedAction) {
      setSelectedAction(move as Action);
      socket.emit("RPS_CHOOSE_ACTION", tournamentCode, socket.userID, move as Action);
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
