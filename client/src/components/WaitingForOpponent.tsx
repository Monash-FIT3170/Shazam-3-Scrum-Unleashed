import LoadingEffect from "./LoadingEffect";
// import PlayerAndSpectatorsInfo from "./PlayerAndSpectatorsInfo";
import PlayerMoveHand from "./PlayerMoveHand";
import { Action } from "../../../types/types";

type WaitingForOpponentProps = {
  // playerScore: number;
  // opponentScore: number;
  // playerName: string;
  // opponentName: string;
  // spectatorCount: number;
  // playerMove: NonNullable<Action>;
  moveAction: NonNullable<Action>;
};

const WaitingForOpponent = ({
  // playerScore,
  // opponentScore,
  // playerName,
  // opponentName,
  // spectatorCount,
  // playerMove = "ROCK",
  // player,
  // opponent,
  moveAction,
}: WaitingForOpponentProps) => {
  return (
    <div>
      {/* <PlayerAndSpectatorsInfo
        playerScore={player.score}
        opponentScore={opponent.score}
        playerName={player.name}
        opponentName={opponent.name}
        spectatorCount={player.spectatorCount}
      /> */}

      <LoadingEffect isOpponent={true} />

      <div className="text-white font-bold text-4xl md:text-6xl fixed top-[45%] mx-auto max-w-max inset-x-0">
        <h1>WAITING FOR OPPONENT</h1>
      </div>

      <PlayerMoveHand
        // TODO - cringe
        playerMove={moveAction}
        isOpponent={false}
        handType="SEMITRANSPARENT"
      />
    </div>
  );
};

export default WaitingForOpponent;
