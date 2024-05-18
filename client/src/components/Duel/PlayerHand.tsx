import paperWin from "../../assets/Duel/Paper.svg";
import paperLose from "../../assets/Duel/Paper-Outline.svg";
import rockWin from "../../assets/Duel/Rock.svg";
import rockLose from "../../assets/Duel/Rock-Outline.svg";
import scissorsWin from "../../assets/Duel/Scissors.svg";
import scissorsLose from "../../assets/Duel/Scissors-Outline.svg";
import { Action } from "../../../../types/types";

interface PlayerHandProps {
  playerMove: Action;
  isWon: boolean;
}

const PlayerHand  = ({ playerMove, isWon }: PlayerHandProps) => {
  const getAsset = (): string => {
    switch (playerMove) {
      case "ROCK":
        return isWon ? rockWin : rockLose;
      case "PAPER":
        return isWon ? paperWin : paperLose;
      case "SCISSORS":
        return isWon ? scissorsWin : scissorsLose;
      default:
        return "";
    }
  };

  return (
    <div>
      <img src={getAsset()} alt={"playerMove"} />
    </div>
  );
};

export default PlayerHand;
