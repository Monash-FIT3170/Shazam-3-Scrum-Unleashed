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
  console.log(isSpectator);
  return (
    <div
      className={
        "fixed text-white font-bold text-2xl px-8 rounded-2xl" +
        ` ${isOpponent ? "top-5 right-6 bg-[#FF5959] pt-1 pb-3" : `bottom-5 left-6 py-2 ${isSpectator ? "bg-spectator-bg" : "bg-[#45BD67]"}`}`
      }
    >
      <p style={{ display: "inline-flex", alignItems: "center" }}>
        {isSpectator && !isOpponent ? (
          <img src={eyeIcon} alt="Eye Icon" style={{ marginRight: "8px" }} />
        ) : null}
        {playerName}
      </p>

      <div className="flex mx-auto max-w-max inset-x-0 space-x-3 mt-1 scale-90">
        <img src={score >= 1 ? filledStar : unfilledStar} />
        <img src={score >= 2 ? filledStar : unfilledStar} />
        <img src={score >= 3 ? filledStar : unfilledStar} />
      </div>
    </div>
  );
};

export default StarsInfo;
