
interface DuelOutcomeTextProps {
  isWon: boolean | null;
  score1: number;
  score2: number;
}

const DuelOutcomeText  = ({
  isWon,
  score1,
  score2,
}: DuelOutcomeTextProps) => {
  let outcomeText = "";

  if (isWon === true) {
    outcomeText = "YOU WON!";
  } else if (isWon === false) {
    outcomeText = "YOU LOST!";
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
