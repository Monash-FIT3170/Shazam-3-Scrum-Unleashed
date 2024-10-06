import React from "react";
import { Action, RPSPowerupSpawn } from "../../../../../types/types.ts";
import PowerupLightning from "../../../assets/choose-move/PowerupLightning.svg";

interface MoveSelectionProps {
  img: string;
  selection: Action;
  onSelectMove: (move: Action) => void;
  powerupSpawn?: RPSPowerupSpawn;
}

const MoveSelection: React.FC<MoveSelectionProps> = ({
  img,
  selection,
  onSelectMove,
  powerupSpawn,
}) => {
  return (
    <button
      onClick={() => onSelectMove(selection)}
      className="w-1/5 focus:outline-none mr-5"
      data-testid={selection?.toLocaleLowerCase()}
    >
      {powerupSpawn && powerupSpawn.onAction == selection && (
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
