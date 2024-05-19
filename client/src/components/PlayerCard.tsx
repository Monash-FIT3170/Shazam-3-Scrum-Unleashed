import { PlayerAttributes } from "../../../types/types";
import cross from "../assets/semitransparent-cross.svg";

interface PlayerCardProps {
  player: PlayerAttributes;
  cardNum: number;
}

const PlayerCard = (props: PlayerCardProps) => {
  // card name of varying borders
  const cardName = "player-card-" + (props.cardNum % 4);
  // checking if the player's name can fit onto the card
  const playerName =
    props.player.name.length > 8
      ? props.player.name.substring(0, 5) + "..."
      : props.player.name;
  return (
      <div className={`${cardName} relative`} >
        <div> {playerName}
          {props.player.spectatingId ? <img src={cross} alt={"Player Eliminated"} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-40 scale-50"/> : ""}
        </div>
      </div>
  );
};

export default PlayerCard;
