import { PlayerAttributes } from "../../../../types/types.ts";
import cross from "../../assets/misc/Cross.svg";

interface PlayerCardProps {
  player: PlayerAttributes;
  cardNum: number;
}

const PlayerCard = ({ player, cardNum }: PlayerCardProps) => {
  // card name of varying borders
  const cardName = "player-card-" + (cardNum % 4);
  // checking if the player's name can fit onto the card
  const playerName =
    player.name.length > 8 ? player.name.substring(0, 5) + "..." : player.name;
  return (
    <div className={`${cardName} relative`} data-testid="lobby-player-item">
      <div>
        {" "}
        {playerName}
        {player.isEliminated ? (
          <img
            src={cross}
            alt={"Player Eliminated"}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-40 scale-50 opacity-50"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
