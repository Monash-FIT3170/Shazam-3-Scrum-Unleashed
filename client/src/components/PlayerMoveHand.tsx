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

type PlayerMoveHandProps = {
    playerMove: string; // eg. rock, paper or scissors
    isOpponent: boolean;
    handType: string; // eg. filled, outlined or semiTransparent
  };

function PlayerMoveHand({ playerMove, isOpponent, handType }: PlayerMoveHandProps) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);

        return () => setLoaded(false);
    });

    return (
        <div>
            <div className={
                'mx-auto max-w-max inset-x-0 scale-75 md:scale-95 absolute duration-[500ms] ease-out transition-all' + 
                ` ${isOpponent ? 
                    ` rotate-180 -top-[345px] md:-top-[355px] ${loaded ? "" : "-translate-y-full"}` 
                    : ` -bottom-[345px] md:-bottom-[355px] ${loaded ? "" : "translate-y-full"}`
                }` 
            }>
                <img src={
                    (handType === "filled" && playerMove === "rock") ? filledRock
                    : (handType === "filled" && playerMove === "paper") ? filledPaper
                    : (handType === "filled" && playerMove === "scissors") ? filledScissors

                    : (handType === "outlined" && playerMove === "rock") ? outlinedRock
                    : (handType === "outlined" && playerMove === "paper") ? outlinedPaper
                    : (handType === "outlined" && playerMove === "scissors") ? outlinedScissors

                    : (handType === "semiTransparent" && playerMove === "rock") ? semiTransparentRock
                    : (handType === "semiTransparent" && playerMove === "paper") ? semiTransparentPaper
                    : (handType === "semiTransparent" && playerMove === "scissors") ? semiTransparentScissors
                    : ""
                } alt={
                    playerMove === "rock" ? "Rock"
                    : playerMove === "paper" ? "Paper"
                    : playerMove === "scissors" ? "Scissors"
                    : ""
                }/>
            </div>
        </div>
    );
}

export default PlayerMoveHand;