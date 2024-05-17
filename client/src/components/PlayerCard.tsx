import Player from "../../../server/model/actors/player";

interface PlayerCardProps {
  player: Player;
  cardNum: number;
}

const PlayerCard = (props: PlayerCardProps) => {
  // card name of varying borders
  const cardName = "player-card-" + props.cardNum;
  // checking if the player's name can fit onto the card
  const playerName =
    props.player.getName().length > 8
      ? props.player.getName().substring(0, 5) + "..."
      : props.player.getName();
  return (
    <div className={cardName}>
      <h2>{playerName}</h2>
    </div>
  );
};
export default PlayerCard;
