import DisplayLogo from "../../DisplayLogo.tsx";
import goldenWinnerCup from "../../../assets/trophies/GoldenWinnerCup.svg";
import star from "../../../assets/misc/PlainStar.svg";
import Confetti from "react-confetti";
import { useEffect, useRef, useState } from "react";
import ButtonComponent from "../../buttons/ButtonComponent.tsx";
import victorySound from "../assets/sfx/victory-sound.mp3";

interface TournamentWinScreenProps {
  playerName: string;
}

const TournamentWin = ({ playerName }: TournamentWinScreenProps) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [showConfetti, setShowConfetti] = useState(true);

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Handler for window resizing
    function windowSizeHandler() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener for window resize
    window.addEventListener("resize", windowSizeHandler);

    // Play the victory sound when the component mounts
    if (audioRef.current) {
      audioRef.current.play();
    }

    // Confetti timeout for 30 seconds
    const confettiTimeout = setTimeout(() => {
      setShowConfetti(false);
    }, 30000); // 30 seconds

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", windowSizeHandler);
      clearTimeout(confettiTimeout);
    };
  }, []); // Empty dependencies array ensures this runs once on mount

  return (
    <div>
      {/* Audio element for victory sound */}
      <audio ref={audioRef} src={victorySound} />

      <div className="fixed top-0 left-0 w-screen h-screen">
        {showConfetti && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
      </div>
      <div className="h-60">
        <DisplayLogo />
      </div>
      <br />
      <div className="flex justify-center transform -mb-80 pointer-events-none select-none">
        <img
          src={goldenWinnerCup}
          alt="golden winner cup"
          className="lg:w-60 w-32 opacity-30"
        />
      </div>
      <div className="flex justify-center transform pointer-events-none select-none">
        <img
          src={star}
          alt="star"
          className="lg:w-44 w-32 hidden md:block -translate-x-16 lg:-translate-x-24"
        />
        <div className="text-center mt-52 lg:mt-10">
          <h2 className="text-white lg:text-8xl text-4xl font-bold -mt-2">
            {playerName.slice(0, 15)}
          </h2>
          <h2 className="text-white md:text-7xl text-5xl font-bold mt-2">
            Winner
          </h2>
        </div>
        <img
          src={star}
          alt="star"
          className="lg:w-44 w-32 hidden md:block translate-x-16 lg:translate-x-24"
        />
      </div>
      <div className="fixed inset-x-0 bottom-10 z-50">
        <ButtonComponent linkPath="/" text={"HOME SCREEN"} />
      </div>
    </div>
  );
};

export default TournamentWin;
