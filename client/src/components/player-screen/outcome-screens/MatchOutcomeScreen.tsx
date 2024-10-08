import plainTrophy from "../../../assets/trophies/PlainTrophy.svg";
import cross from "../../../assets/misc/Cross.svg";
import { PlayerAttributes } from "../../../../../types/types.ts";

type MatchOutcomeScreenProps = {
  player: PlayerAttributes;
  opponent: PlayerAttributes;
  isWin: boolean;
  isSpectator: boolean;
};

const MatchOutcomeScreen = ({
  player,
  opponent,
  isWin,
  isSpectator,
}: MatchOutcomeScreenProps) => {
  return (
    <div>
      <div
        className={
          "fixed mx-auto max-w-max inset-x-0 scale-[0.85] sm:scale-[0.85] md:scale-[0.875] lg:scale-[0.90]" +
          ` ${isWin ? "top-[5%]" : "top-[10%]"}`
        }
      >
        <img
          src={isWin ? plainTrophy : cross}
          alt={isWin ? "PlainTrophy" : "RedCross"}
        />
      </div>

      <div className="text-white font-bold text-6xl fixed top-[39%] mx-auto max-w-max inset-x-0">
        <h1>
          {isSpectator
            ? isWin
              ? `${player.name.slice(0, 15)} WON!`
              : `${player.name.slice(0, 15)} LOST!`
            : isWin
              ? "YOU WON!"
              : "YOU LOST!"}
        </h1>
      </div>
      <div className="text-white font-bold text-6xl fixed top-[51%] mx-auto max-w-max inset-x-0">
        <h1>
          <span className={isWin ? "text-[#65DB71]" : ""}>{player.score}</span>
          {" - "}
          <span className={isWin ? "" : "text-[#FF5959]"}>
            {opponent.score}
          </span>
        </h1>
      </div>

      <div className="text-white font-bold text-2xl md:text-3xl fixed top-[66%] mx-auto max-w-max inset-x-0">
        {isWin ? (
          <p>
            <span className="text-[#FFC700]">{opponent.name.slice(0, 15)}</span>{" "}
            AND THEIR FOLLOWERS WILL NOW FOLLOW{" "}
            {isSpectator ? `${player.name.slice(0, 15)}!` : "YOU!"}
          </p>
        ) : (
          <p>
            {isSpectator ? `${player.name.slice(0, 15)}` : "YOU"} AND{" "}
            {isSpectator ? "THEIR" : "YOUR"} FOLLOWERS WILL NOW FOLLOW{" "}
            <span className="text-[#FFC700]">{opponent.name.slice(0, 15)}</span>
            !
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchOutcomeScreen;
