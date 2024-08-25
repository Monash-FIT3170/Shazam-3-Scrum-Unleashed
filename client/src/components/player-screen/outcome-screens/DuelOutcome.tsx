import { Action, PlayerAttributes } from "../../../../../types/types.ts";
import DuelOutcomeText from "./DuelOutcomeText.tsx";
import { DuelResult, HandImgType } from "../../../types";
import PlayerMoveHand from "../PlayerMoveHand.tsx";

interface PlayerProps {
  userPlayer: PlayerAttributes;
  opponent: PlayerAttributes;
  userAction: Action;
  opponentAction: Action;
}

const rulesMap: Map<Action, Action> = new Map<Action, Action>([
  ["ROCK", "SCISSORS"],
  ["PAPER", "ROCK"],
  ["SCISSORS", "PAPER"],
]);

// fixme scuffed
const DuelOutcome = ({
  userPlayer,
  opponent,
  userAction,
  opponentAction,
}: PlayerProps) => {
  let duelResult: DuelResult = "DRAW";
  let userPlayerHandType: HandImgType = "FILLED";
  let opponentHandType: HandImgType = "FILLED";
  if (userAction !== opponentAction) {
    if (rulesMap.get(userAction) === opponentAction) {
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
        playerMove={opponentAction ?? "ROCK"}
        isOpponent={true}
        handType={opponentHandType}
      />
      <PlayerMoveHand
        playerMove={userAction ?? "ROCK"}
        isOpponent={false}
        handType={userPlayerHandType}
      />
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
