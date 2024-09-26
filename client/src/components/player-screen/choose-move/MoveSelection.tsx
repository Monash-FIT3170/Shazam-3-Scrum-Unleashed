import React from "react";
import { Action } from "../../../../../types/types.ts";
import PowerupLightning from "../../../assets/choose-move/PowerupLightning.svg";

interface MoveSelectionProps {
  img: string;
  selection: Action;
  onSelectMove: (move: Action) => void;
  powerup?: boolean;
}

const MoveSelection: React.FC<MoveSelectionProps> = ({
  img,
  selection,
  onSelectMove,
  powerup,
}) => {
  return (
    <button
      onClick={() => onSelectMove(selection)}
      className="w-1/5 focus:outline-none mr-5"
      data-testid={selection?.toLocaleLowerCase()}
    >
      {powerup && (
        <img
          src={PowerupLightning}
          alt="Powerup avaliable"
          className="absolute"
        />
      )}
      <img src={img} alt={img} className="w-full" />
    </button>
  );
};
export default MoveSelection;
