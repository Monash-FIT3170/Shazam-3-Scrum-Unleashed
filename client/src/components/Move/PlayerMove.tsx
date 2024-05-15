import { useEffect, useState } from "react";
import semiTransparentPaper from "../assets/SemiTransparentPaper.svg";
import semiTransparentRock from "../assets/SemiTransparentRock.svg";
import semiTransparentScissors from "../assets/SemiTransparentScissors.svg";
import filledPaper from "../assets/Paper.svg";
import filledRock from "../assets/Rock.svg";
import filledScissors from "../assets/Scissors.svg";
import outlinedPaper from "../assets/Paper-Outline.svg";
import outlinedRock from "../assets/Rock-Outline.svg";
import outlinedScissors from "../assets/Scissors-Outline.svg";
import { Action } from "../../../../types/types";
import { HandImgType } from "../../types";

type PlayerMoveHandProps = {
  playerMove: Action; // eg. ROCK, PAPER or SCISSORS
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
    setLoaded(true);

    return () => setLoaded(false);
  });

  return (
    <div>
      <div
        className={
          "mx-auto max-w-max inset-x-0 scale-75 md:scale-95 absolute duration-[500ms] ease-out transition-all" +
          ` ${
            isOpponent
              ? ` rotate-180 -top-[345px] md:-top-[355px] ${loaded ? "" : "-translate-y-full"}`
              : ` -bottom-[345px] md:-bottom-[355px] ${loaded ? "" : "translate-y-full"}`
          }`
        }
      >
        <img
          src={
            handType === "FILLED" && playerMove === "ROCK"
              ? filledRock
              : handType === "FILLED" && playerMove === "PAPER"
                ? filledPaper
                : handType === "FILLED" && playerMove === "SCISSORS"
                  ? filledScissors
                  : handType === "OUTLINED" && playerMove === "ROCK"
                    ? outlinedRock
                    : handType === "OUTLINED" && playerMove === "PAPER"
                      ? outlinedPaper
                      : handType === "OUTLINED" && playerMove === "SCISSORS"
                        ? outlinedScissors
                        : handType === "SEMI_TRANSPARENT" &&
                            playerMove === "ROCK"
                          ? semiTransparentRock
                          : handType === "SEMI_TRANSPARENT" &&
                              playerMove === "PAPER"
                            ? semiTransparentPaper
                            : handType === "SEMI_TRANSPARENT" &&
                                playerMove === "SCISSORS"
                              ? semiTransparentScissors
                              : ""
          }
          alt={
            playerMove === "ROCK"
              ? "Rock"
              : playerMove === "PAPER"
                ? "Paper"
                : playerMove === "SCISSORS"
                  ? "Scissors"
                  : ""
          }
        />
      </div>
    </div>
  );
}

export default PlayerMoveHand;