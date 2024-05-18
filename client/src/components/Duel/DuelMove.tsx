import PlayerHand from "./PlayerHand";
import { Action } from "../../../../types/types";
import Player from "../../../../server/model/actors/player";



interface PlayerProps {
  player1: Player,
  player2: Player,
}

const DuelMove = ({ player1, player2 }: PlayerProps) => {
  //const playerChoice1: Action = player1.actionChoice;
  //const playerChoice2: Action = player2.actionChoice;
  const playerChoice1: Action = "ROCK"
  const playerChoice2: Action = "PAPER"

  return (
    <div className="h-screen">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 rotate-180">
        <PlayerHand playerMove={playerChoice2} isWon={false} />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
        <PlayerHand playerMove={playerChoice1} isWon={true} />
      </div>
    </div>
  );
};

export default DuelMove;