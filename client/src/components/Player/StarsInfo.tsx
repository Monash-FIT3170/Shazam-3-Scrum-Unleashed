import filledStar from "../../assets/FilledStar.svg";
import unfilledStar from "../../assets/UnfilledStar.svg";

type StarsInfoProps = {
  playerName: string;
  score: number;
  isOpponent: boolean;
};

const StarsInfo = ({ playerName, score, isOpponent }: StarsInfoProps) => {
  return (
    <div
      className={
        "fixed text-white font-bold text-2xl px-8 rounded-2xl" +
        ` ${isOpponent ? "top-5 right-6 bg-[#FF5959] pt-1 pb-3" : "bottom-5 left-6 bg-[#45BD67] py-2"}`
      }
    >
      <p>{playerName}</p>
      <div className="flex mx-auto max-w-max inset-x-0 space-x-3 mt-1 scale-90">
        <img src={score >= 1 ? filledStar : unfilledStar} />
        <img src={score >= 2 ? filledStar : unfilledStar} />
        <img src={score >= 3 ? filledStar : unfilledStar} />
      </div>
    </div>
  );
};

export default StarsInfo;
