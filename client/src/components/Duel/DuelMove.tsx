//This is responsible for displaying the moves of the Players
//By Anand Vannalath

import PlayerMoveHand from "../Move/PlayerMove";
import { Action } from "../../../../types/types";
import { Result, HandImgType } from "../../types";
import DuelScore from "./DuelScore";

interface MoveProps {
  score1: number;
  score2: number;
  move: Action;
  result: Result;
}

const DuelMove = ({ score1, score2, move, result }: MoveProps) => {
  let opponentMove: Action = "NONE";
  let playerHandType: HandImgType = "NONE";
  let opponentHandType: HandImgType = "NONE";

  if (result === "WIN") {
    playerHandType = "FILLED";
    opponentHandType = "OUTLINED";

    if (move === "PAPER") {
      opponentMove = "ROCK";
    } else if (move === "ROCK") {
      opponentMove = "SCISSORS";
    } else {
      opponentMove = "PAPER";
    }
  } else if (result === "LOSE") {
    playerHandType = "OUTLINED";
    opponentHandType = "FILLED";

    if (move === "PAPER") {
      opponentMove = "SCISSORS";
    } else if (move === "ROCK") {
      opponentMove = "PAPER";
    } else {
      opponentMove = "ROCK";
    }
  } else {
    playerHandType = opponentHandType = "FILLED";
    opponentMove = move;
  }

  return (
    <div className="w-full h-full">
      <PlayerMoveHand
        playerMove={move}
        isOpponent={false}
        handType={playerHandType}
      />
      <PlayerMoveHand
        playerMove={opponentMove}
        isOpponent={true}
        handType={opponentHandType}
      />
      <DuelScore score1={score1} score2={score2} result={result} />
    </div>
  );
};

export default DuelMove;
