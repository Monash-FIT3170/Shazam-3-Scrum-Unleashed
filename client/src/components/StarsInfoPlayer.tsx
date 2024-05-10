import filledStar from "../assets/FilledStar.svg";
import unfilledStar from "../assets/UnfilledStar.svg";

type StarsInfoPlayerProps = {
  playerName: string;
  score: number;
};

const StarsInfoPlayer = ({ playerName, score }: StarsInfoPlayerProps) => {
  return (
    <div className="fixed bottom-5 left-6 text-2xl text-white font-bold bg-[#45BD67] px-8 py-2 rounded-2xl">
      <p>{playerName}</p>

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

export default StarsInfoPlayer;
