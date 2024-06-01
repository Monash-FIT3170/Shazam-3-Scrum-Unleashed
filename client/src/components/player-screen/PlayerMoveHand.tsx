import { useEffect, useState } from "react";
import { Action } from "../../../../types/types.ts";
import { HandImgType } from "../../types";

type PlayerMoveHandProps = {
  playerMove: NonNullable<Action>;
  isOpponent: boolean;
  handType: HandImgType; // eg. FILLED, OUTLINED or SEMI_TRANSPARENT
};

function PlayerMoveHand({
  playerMove,
  isOpponent,
  handType,
}: PlayerMoveHandProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 10);

    return () => setLoaded(false);
  }, []);

  return (
    <div>
      <div
        className={
          "mx-auto max-w-max inset-x-0 scale-75 md:scale-95 fixed duration-[500ms] ease-out transition-all" +
          ` ${
            isOpponent
              ? ` rotate-180 -top-[345px] md:-top-[355px] ${loaded ? "" : "-translate-y-full"}`
              : ` -bottom-[345px] md:-bottom-[355px] ${loaded ? "" : "translate-y-full"}`
          }`
        }
      >
        <img
          src={`/src/assets/actions/${handType.toLowerCase()}-${playerMove.toLowerCase()}.svg`}
          alt={playerMove.toLowerCase()}
        />
      </div>
    </div>
  );
}

export default PlayerMoveHand;
