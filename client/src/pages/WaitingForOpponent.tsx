import LoadingEffect from "../components/LoadingEffect";
import PlayerAndSpectatorsInfo from "../components/PlayerAndSpectatorsInfo";
import PlayerMoveHand from "../components/PlayerMoveHand";
import { Action } from "../../../types/types";

type WaitingForOpponentProps = {
  playerScore: number;
  opponentScore: number;
  playerName: string;
  opponentName: string;
  spectatorCount: number;
  playerMove: Action;
};

const WaitingForOpponent = ({
  playerScore,
  opponentScore,
  playerName,
  opponentName,
  spectatorCount,
  playerMove = "ROCK",
}: WaitingForOpponentProps) => {
  return (
    <div>
      <PlayerAndSpectatorsInfo
        playerScore={playerScore}
        opponentScore={opponentScore}
        playerName={playerName}
        opponentName={opponentName}
        spectatorCount={spectatorCount}
      />

      <LoadingEffect isOpponent={true} />

      <div className="text-white font-bold text-4xl md:text-6xl fixed top-[45%] mx-auto max-w-max inset-x-0">
        <h1>WAITING FOR OPPONENT</h1>
      </div>

      <PlayerMoveHand
        playerMove={playerMove}
        isOpponent={false}
        handType="SEMITRANSPARENT"
      />
    </div>
  );
};

export default WaitingForOpponent;
