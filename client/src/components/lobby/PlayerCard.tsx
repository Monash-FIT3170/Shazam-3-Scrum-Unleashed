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
  const playerName =
    player.name.length > 8 ? player.name.substring(0, 7) + "..." : player.name;
  return (
    <div
      className={`${cardName} relative hover:brightness-75 ${!inProgress ? "animate-enterAndShake" : ""} ${player.isEliminated ? "animate-elimbox" : ""}`}
      data-testid="lobby-player-item"
      onClick={interact}
    >
      <div className="flex justify-center items-center max-w-full font-bold px-2">
        {" "}
        <span className="text-ellipsis overflow-hidden">{playerName}</span>
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
