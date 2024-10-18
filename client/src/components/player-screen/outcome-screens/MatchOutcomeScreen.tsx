import plainTrophy from "../../../assets/trophies/PlainTrophy.svg";
import cross from "../../../assets/misc/Cross.svg";
import { PlayerAttributes } from "../../../../../types/types.ts";
import { useEffect, useRef } from "react";
import victorySound from "../../../assets/sfx/victory-sound.mp3";
import defeatSound from "../../../assets/sounds/defeat-sound.mp3";

type MatchOutcomeScreenProps = {
  player: PlayerAttributes;
  opponent: PlayerAttributes;
  isWin: boolean;
  isSpectator: boolean;
};

const MatchOutcomeScreen = ({
  player,
  opponent,
  isWin,
  isSpectator,
}: MatchOutcomeScreenProps) => {
  const audioRef = useRef<HTMLAudioElement>(null); // Ref to control the audio element

  useEffect(() => {
    // Select the sound based on win or lose scenario
    const soundSrc = isWin ? victorySound : defeatSound;

    // Create an audio object for the sound effect
    const audio = new Audio(soundSrc);

    // Play the sound
    audio.play();

    // Cleanup function to stop the sound if the component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio to the start
    };
  }, [isWin]); // The effect depends on the isWin prop

  return (
    <div>
      {/* Audio element is no longer needed as we're using the Audio API directly */}
      
      {/* Outcome Trophy or Cross Image */}
      <div
        className={
          "fixed mx-auto max-w-max inset-x-0 scale-[0.85] sm:scale-[0.85] md:scale-[0.875] lg:scale-[0.90]" +
          ` ${isWin ? "top-[5%]" : "top-[10%]"}`
        }
      >
        <img
          src={isWin ? plainTrophy : cross}
          alt={isWin ? "PlainTrophy" : "RedCross"}
        />
      </div>

      {/* Outcome Text (WON or LOST) */}
      <div className="text-white font-bold text-6xl fixed top-[39%] mx-auto max-w-max inset-x-0">
        <h1>
          {isSpectator
            ? isWin
              ? `${player.name.slice(0, 15)} WON!`
              : `${player.name.slice(0, 15)} LOST!`
            : isWin
            ? "YOU WON!"
            : "YOU LOST!"}
        </h1>
      </div>

      {/* Score Display */}
      <div className="text-white font-bold text-6xl fixed top-[51%] mx-auto max-w-max inset-x-0">
        <h1>
          <span className={isWin ? "text-[#65DB71]" : ""}>{player.score}</span>
          {" - "}
          <span className={isWin ? "" : "text-[#FF5959]"}>{opponent.score}</span>
        </h1>
      </div>

      {/* Follower Text */}
      <div className="text-white font-bold text-2xl md:text-3xl fixed top-[66%] mx-auto max-w-max inset-x-0">
        {isWin ? (
          <p>
            <span className="text-[#FFC700]">{opponent.name.slice(0, 15)}</span>{" "}
            AND THEIR FOLLOWERS WILL NOW FOLLOW{" "}
            {isSpectator ? `${player.name.slice(0, 15)}!` : "YOU!"}
          </p>
        ) : (
          <p>
            {isSpectator ? `${player.name.slice(0, 15)}` : "YOU"} AND{" "}
            {isSpectator ? "THEIR" : "YOUR"} FOLLOWERS WILL NOW FOLLOW{" "}
            <span className="text-[#FFC700]">{opponent.name.slice(0, 15)}</span>
            !
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchOutcomeScreen;