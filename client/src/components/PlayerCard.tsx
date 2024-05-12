// import { PlayerAttributes } from "../../../types/types";
// import Player from "../../../server/model/actors/player"

import { AppProps } from "../types";

const PlayerCard = (props: AppProps) => {
    const cardNum = props.count % 4;
    const cardName = "player_card" + cardNum.toString();
    return(
        <div className={cardName}>
            <h2>{props.player.getName()}</h2>
        </div>
    );
};

// const PlayerCard = () => {
//     return(
//         <div className="player_card">
//             <h2>THIS IS THE LOCATION OF A NAME</h2>
//         </div>
//     );
// };

export default PlayerCard;