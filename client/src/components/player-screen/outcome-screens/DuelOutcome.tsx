import { Action, PlayerAttributes } from "../../../../../types/types.ts";
import DuelOutcomeText from "./DuelOutcomeText.tsx";
import { DuelResult, HandImgType } from "../../../types";
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
  if (userPlayer.gameData !== opponent.gameData) {
    if (rulesMap.get(userPlayer.gameData) === opponent.gameData) {
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
        playerMove={opponent.gameData ?? "ROCK"}
        isOpponent={true}
        handType={opponentHandType}
      />
      <PlayerMoveHand
        playerMove={userPlayer.gameData ?? "ROCK"}
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
