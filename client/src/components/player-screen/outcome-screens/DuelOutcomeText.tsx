import { DuelResult } from "../../../types";

interface DuelOutcomeTextProps {
  duelResult: DuelResult;
  score1: number;
  score2: number;
}

const DuelOutcomeText = ({
  duelResult,
  score1,
  score2,
}: DuelOutcomeTextProps) => {
  let outcomeText = "";

  // fixme scuffed 2
  if (duelResult === "LOSE") {
    outcomeText = "YOU LOST!";
  } else if (duelResult === "WIN") {
    outcomeText = "YOU WIN!";
  } else {
    outcomeText = "IT'S A DRAW!";
  }

  return (
    <div className="text-center text-white">
      <h1 className="font-bold text-5xl mb-4">{outcomeText}</h1>
      <p className="font-bold text-5xl ">
        {score1} - {score2}
      </p>
    </div>
  );
};

export default DuelOutcomeText;
