import PlayerHand from "./PlayerHand";
import { Action, PlayerAttributes } from "../../../../types/types";
import DuelOutcomeText from "./DuelOutcomeText";



interface PlayerProps {
  player1: PlayerAttributes;
  player2: PlayerAttributes;
}

const DuelMove = ({ player1, player2 }: PlayerProps) => {
  //const playerChoice1: Action = player1.actionChoice;
  //const playerChoice2: Action = player2.actionChoice;
  //const playerScore1 = player1.score;
  // const playerScore2 = player2.score;
  const playerChoice1: Action = "ROCK";
  const playerChoice2: Action = "PAPER";

  // Example values for demonstration purposes
  const isWon: boolean | null = false;
  const score1 = 2;
  const score2 = 3;

  return (
    <div className="h-screen">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 rotate-180">
        <PlayerHand playerMove={playerChoice2} isWon={false} />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
        <PlayerHand playerMove={playerChoice1} isWon={true} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <DuelOutcomeText isWon={isWon} score1={score1} score2={score2} />
      </div>
    </div>
  );
};

export default DuelMove;