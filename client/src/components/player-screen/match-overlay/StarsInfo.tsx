import filledStar from "../../../assets/misc/FilledStar.svg";
import unfilledStar from "../../../assets/misc/UnfilledStar.svg";
import eyeIcon from "../../../assets/misc/EyeIcon.svg";

type StarsInfoProps = {
  playerName: string;
  score: number;
  isOpponent: boolean;
  isSpectator: boolean;
};

const StarsInfo = ({
  playerName,
  score,
  isOpponent,
  isSpectator,
}: StarsInfoProps) => {
  return (
    <div
      className={
        "fixed text-white font-bold text-2xl px-4 rounded-xl pb-2 -m-4 z-0 shadow-[0_0_10px_4px_rgba(0,0,0,0.3)]" +
        ` ${isOpponent ? "top-8 right-8 bg-[#FF5959] " : `bottom-8 left-8 ${isSpectator ? "bg-spectator-bg" : "bg-green-bg"}`}`
      }
    >
      <p className="max-h-4 align-middle items-center inline-flex">
        {isSpectator && !isOpponent ? (
          <img src={eyeIcon} alt="Eye Icon" className="block mr-3" />
        ) : null}
        {playerName} <p className="md:hidden sm:block "> {`: ${score}`}</p>
      </p>
      <div className="mx-auto max-w-max inset-x-0 space-x-3 mt-1 scale-90 hidden sm:flex">
        <img src={score >= 1 ? filledStar : unfilledStar} />
        <img src={score >= 2 ? filledStar : unfilledStar} />
        <img src={score >= 3 ? filledStar : unfilledStar} />
      </div>
    </div>
  );
};

export default StarsInfo;
