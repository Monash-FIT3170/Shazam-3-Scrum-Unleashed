import { PlayerAttributes } from "../../../../types/types.ts";
import cross from "../../assets/misc/Cross.svg";

interface PlayerCardProps {
  player: PlayerAttributes;
  cardNum: number;
  interact: () => void;
  inProgress: boolean;
}

const PlayerCard = ({
  player,
  cardNum,
  interact,
  inProgress,
}: PlayerCardProps) => {
  // card name of varying borders
  const cardName = "player-card-" + (cardNum % 4);
  return (
    <div
      className={`${cardName} relative ${!inProgress ? "animate-enterAndShake" : ""} ${player.isEliminated ? "animate-elimbox hover:brightness-75" : ""}`}
      data-testid="lobby-player-item"
      onClick={interact}
    >
      <div className="flex justify-center items-center max-w-full font-bold px-2">
        {" "}
        <span className="text-ellipsis overflow-hidden">{player.name}</span>
        {player.isEliminated ? (
          <img
            src={cross}
            alt="Player Eliminated"
            className="absolute w-40 scale-75 animate-elimcross opacity-50 select-none overflow-visible"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
