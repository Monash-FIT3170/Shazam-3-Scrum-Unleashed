import React from "react";
import { Action } from "../../../types/types";

interface MoveSelectionProps {
  img: string;
  selection: Action;
  onSelectMove: (move: Action) => void;
}

const MoveSelection: React.FC<MoveSelectionProps> = ({
  img,
  selection,
  onSelectMove,
}) => {
  return (
    <button
      onClick={() => onSelectMove(selection)}
      className="w-1/5 focus:outline-none mr-5"
    >
      <img src={img} alt={img} className="w-full" />
    </button>
  );
};
export default MoveSelection;
