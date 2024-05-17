import { useEffect, useState } from "react";
import { Action } from "../../../../types/types";
import { HandImgType } from "../../types";

type PlayerMoveProps = {
  playerMove: Action; // eg. ROCK, PAPER or SCISSORS
  isOpponent: boolean;
  handType: HandImgType; // eg. FILLED, OUTLINED or SEMI_TRANSPARENT
};

function PlayerMove({ playerMove, isOpponent, handType }: PlayerMoveProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    return () => setLoaded(false);
  });

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
          src={`/shazam-3-scrum-unleashed/src/assets/${handType.toLowerCase()}-${playerMove.toLowerCase()}.svg`}
          alt={playerMove.toLowerCase()}
        />
      </div>
    </div>
  );
}

export default PlayerMove;
