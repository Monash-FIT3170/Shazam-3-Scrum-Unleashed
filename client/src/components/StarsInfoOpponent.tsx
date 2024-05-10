import filledStar from "../assets/FilledStar.svg";
import unfilledStar from "../assets/UnfilledStar.svg";

type StarsInfoOpponentProps = {
  opponentName: string;
  score: number;
};

const StarsInfoOpponent = ({ opponentName, score }: StarsInfoOpponentProps) => {
  return (
    <div className="fixed top-5 right-6 text-2xl text-white font-bold bg-[#FF5959] px-8 pt-1 pb-3 rounded-2xl">
      <p>{opponentName}</p>

      {score <= 0 && (
        <div className="flex mx-auto max-w-max inset-x-0 space-x-3 mt-1 scale-90">
          <img src={unfilledStar} alt="UnfilledStar" />
          <img src={unfilledStar} alt="UnfilledStar" />
          <img src={unfilledStar} alt="UnfilledStar" />
        </div>
      )}
      {score === 1 && (
        <div className="flex mx-auto max-w-max inset-x-0 space-x-3 mt-1 scale-90">
          <img src={filledStar} alt="FilledStar" />
          <img src={unfilledStar} alt="UnfilledStar" />
          <img src={unfilledStar} alt="UnfilledStar" />
        </div>
      )}
      {score === 2 && (
        <div className="flex mx-auto max-w-max inset-x-0 space-x-3 mt-1 scale-90">
          <img src={filledStar} alt="FilledStar" />
          <img src={filledStar} alt="FilledStar" />
          <img src={unfilledStar} alt="UnfilledStar" />
        </div>
      )}
      {score >= 3 && (
        <div className="flex mx-auto max-w-max inset-x-0 space-x-3 mt-1 scale-90">
          <img src={filledStar} alt="FilledStar" />
          <img src={filledStar} alt="FilledStar" />
          <img src={filledStar} alt="FilledStar" />
        </div>
      )}
    </div>
  );
};

export default StarsInfoOpponent;
