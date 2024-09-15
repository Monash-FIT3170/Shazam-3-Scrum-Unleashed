import DisplayLogo from "../../DisplayLogo.tsx";
import goldenWinnerCup from "../../../assets/trophies/GoldenWinnerCup.svg";
import star from "../../../assets/misc/PlainStar.svg";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import ButtonComponent from "../../buttons/ButtonComponent.tsx";

interface TournamentWinScreenProps {
  playerName: string;
}

const TournamentWin = ({ playerName }: TournamentWinScreenProps) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [showConfetti, setShowConfetti] = useState(true);

  function windowSizeHandler() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.onresize = () => windowSizeHandler();

    setTimeout(() => {
      setShowConfetti(false);
    }, 30000); // 30s
  });

  return (
    <div>
      <div className="fixed top-0 left-0 w-screen h-screen z-50">
        {showConfetti && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
      </div>
      <div className="h-60">
        <DisplayLogo />
      </div>
      <br></br>
      <div className="flex justify-center transform -mb-80">
        <img
          src={goldenWinnerCup}
          alt="golden winner cup"
          className="lg:w-60 w-32 opacity-30"
        />
      </div>
      <div className="flex justify-center transform">
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
      <div className="absolute inset-x-0 bottom-10 z-50">
        <ButtonComponent linkPath="/" text={"Home Screen"} />
      </div>
    </div>
  );
};

export default TournamentWin;
