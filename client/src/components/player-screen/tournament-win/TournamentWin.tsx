import DisplayLogo from "../../DisplayLogo.tsx";
import goldenWinnerCup from "../../../assets/trophies/GoldenWinnerCup.svg";
import star from "../../../assets/misc/PlainStar.svg";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

interface TournamentWinScreenProps {
  playerName: string;
}

const TournamentWin = ({ playerName }: TournamentWinScreenProps) => {
  const navigate = useNavigate();

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
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <div className="h-60">
        <DisplayLogo />
      </div>
      <br></br>
      <div className="flex justify-center transform -mb-80">
        <img
          src={goldenWinnerCup}
          alt="goldenWinnerCup"
          className="lg:w-60 w-32 opacity-30"
        />
      </div>
      <div className="flex justify-center transform">
        <img
          src={star}
          alt="goldenWinnerCup"
          className="md:w-60 hidden  md:visible"
        />
        <div className="text-center mt-52 lg:mt-10">
          <h2 className="text-white lg:text-8xl text-4xl font-bold">
            {playerName.slice(0, 15)}
          </h2>
          <h2 className="text-white md:text-7xl text-5xl font-bold">Winner</h2>
        </div>
        <img
          src={star}
          alt="goldenWinnerCup"
          className="md:w-60 hidden  md:visible"
        />
      </div>
      <div className="absolute inset-x-0 bottom-10 z-50">
        <button
          className="text-white bg-primary text-3xl w-80 md:w-96 lg:w-122 font-bold rounded-xl h-full border-white"
          onClick={() => navigate("/")}
        >
          Home Screen
        </button>
      </div>
    </div>
  );
};

export default TournamentWin;
