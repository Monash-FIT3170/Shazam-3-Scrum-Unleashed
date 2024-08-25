import { DuelResult } from "../../../types";

interface DuelOutcomeTextProps {
  duelResult: DuelResult;
  score1: number;
  score2: number;
  isSpectator: boolean; // Added isSpectator boolean prop
  playerName: string; // Added playerName prop
}

const DuelOutcomeText = ({
  duelResult,
  score1,
  score2,
  isSpectator,
  playerName,
}: DuelOutcomeTextProps) => {
  // Determine outcome text based on duel result
  const outcomeText =
    duelResult === "WIN"
      ? isSpectator
        ? `${playerName} WINS!`
        : "YOU WIN!"
      : duelResult === "LOSE"
        ? isSpectator
          ? `${playerName} LOST!`
          : "YOU LOST!"
        : "IT'S A DRAW!";

  return (
    <div className="text-center text-white">
      <h1 className="font-bold text-5xl mb-4">{outcomeText}</h1>
      <p className="font-bold text-5xl">
        {score1} - {score2}
      </p>
    </div>
  );
};

export default DuelOutcomeText;
