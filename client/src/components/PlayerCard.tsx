import { PlayerAttributes } from "../../../types/types";

interface PlayerCardProps {
  player: PlayerAttributes;
  cardNum: number;
}

const PlayerCard = (props: PlayerCardProps) => {
  // card name of varying borders
  const cardName = "player-card-" + props.cardNum % 4;
  // checking if the player's name can fit onto the card
  const playerName =
    props.player.name.length > 8
      ? props.player.name.substring(0, 5) + "..."
      : props.player.name;
  return (
    <div className={cardName}>
      <h2>{playerName}</h2>
    </div>
  );
};
export default PlayerCard;
