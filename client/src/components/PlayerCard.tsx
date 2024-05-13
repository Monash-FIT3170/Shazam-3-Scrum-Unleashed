import Player from "../../../server/model/actors/player";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = (props: PlayerCardProps) => {
  const cardNum = props.player.getId() % 4;
  // card name of varying borders
  const cardName = "player-card-" + cardNum;
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
