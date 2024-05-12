// import { PlayerAttributes } from "../../../types/types";
import Player from "../../../server/model/actors/player"
import PropTypes from 'prop-types';

import { AppProps } from "../types";

const PlayerCard = (props: AppProps) => {
    const cardNum = props.count % 4;
    const cardName = "player-card-" + cardNum;
    // checking if the player's name can fit onto the card
    const playerName = props.player.getName().length > 8 
      ? props.player.getName().substring(0,5) + "..." : props.player.getName();
    return(
        <div className={cardName}>
            <h2>{playerName}</h2>
        </div>
    );
};

// ensuring inputs are of correct type
PlayerCard.propTypes = {
  player: PropTypes.instanceOf(Player),
  count: PropTypes.number,
}
// making default values just incase no input is given
PlayerCard.defaultProps = {
  player: new Player("NA", "NA", -1, false),
  count: -1,
}

export default PlayerCard;