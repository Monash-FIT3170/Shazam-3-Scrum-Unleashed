import LoadingEffect from "./LoadingEffect.tsx";
import PlayerMoveHand from "../PlayerMoveHand.tsx";
import { Action } from "../../../../../types/types.ts";

type WaitingForOpponentProps = {
  moveAction: NonNullable<Action>;
};

const WaitingForOpponent = ({ moveAction }: WaitingForOpponentProps) => {
  return (
    <div>
      <LoadingEffect isOpponent={true} />

      <div className="text-white font-bold text-4xl md:text-6xl fixed top-[45%] mx-auto max-w-max inset-x-0">
        <h1>WAITING FOR OPPONENT</h1>
      </div>

      <PlayerMoveHand
        playerMove={moveAction}
        isOpponent={false}
        handType="SEMITRANSPARENT"
      />
    </div>
  );
};

export default WaitingForOpponent;
