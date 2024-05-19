import { Action, PlayerAttributes } from "../../../../types/types";
import DuelOutcomeText from "./DuelOutcomeText";
import { DuelResult, HandImgType } from "../../types";
import PlayerMoveHand from "../PlayerMoveHand.tsx";

interface PlayerProps {
  userPlayer: PlayerAttributes;
  opponent: PlayerAttributes;
}

const rulesMap: Map<Action, Action> = new Map<Action, Action>([
  ["ROCK", "SCISSORS"],
  ["PAPER", "ROCK"],
  ["SCISSORS", "PAPER"],
]);

// fixme scuffed
const DuelOutcome = ({ userPlayer, opponent }: PlayerProps) => {
  let duelResult: DuelResult = "DRAW";
  let userPlayerHandType: HandImgType = "FILLED";
  let opponentHandType: HandImgType = "FILLED";
  if (userPlayer.actionChoice !== opponent.actionChoice) {
    if (rulesMap.get(userPlayer.actionChoice) === opponent.actionChoice) {
      duelResult = "WIN";
      opponentHandType = "OUTLINED";
    } else {
      duelResult = "LOSE";
      userPlayerHandType = "OUTLINED";
    }
  }

  return (
    <div>
      <PlayerMoveHand
        playerMove={opponent.actionChoice ?? "ROCK"}
        isOpponent={true}
        handType={opponentHandType}
      />
      <PlayerMoveHand
        playerMove={userPlayer.actionChoice ?? "ROCK"}
        isOpponent={false}
        handType={userPlayerHandType}
      />
      {/*<div className="absolute -top-80 left-1/2 transform -translate-x-1/2 rotate-180">*/}
      {/*    <PlayerHand playerMove={opponent.actionChoice} filledHand={!filledHand || duelResult === "DRAW"} />*/}
      {/*</div>*/}
      {/*<div className="absolute -bottom-80 left-1/2 transform -translate-x-1/2">*/}
      {/*    <PlayerHand playerMove={userPlayer.actionChoice} filledHand={filledHand} />*/}
      {/*</div>*/}
      <div className="absolute inset-0 flex items-center justify-center">
        <DuelOutcomeText
          duelResult={duelResult}
          score1={userPlayer.score}
          score2={opponent.score}
        />
      </div>
    </div>
  );
};

export default DuelOutcome;
