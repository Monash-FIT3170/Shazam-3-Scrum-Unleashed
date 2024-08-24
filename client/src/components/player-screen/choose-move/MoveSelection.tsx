import React from "react";
import { Selection } from "../../../../../types/types.ts";

interface MoveSelectionProps {
  img: string;
  selection: Selection;
  onSelectMove: (move: Selection) => void;
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
      data-testid={selection?.toLocaleLowerCase()}
    >
      <img src={img} alt={img} className="w-full" />
    </button>
  );
};
export default MoveSelection;
