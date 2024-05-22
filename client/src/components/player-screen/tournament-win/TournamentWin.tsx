import DisplayLogo from "../../DisplayLogo.tsx";
import goldenWinnerCup from "../../../assets/trophies/GoldenWinnerCup.svg";
import star from "../../../assets/misc/PlainStar.svg";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../../../pages/pagePaths.ts";

interface TournamentWinScreenProps {
  playerName: string;
}

const TournamentWin = ({ playerName }: TournamentWinScreenProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-60">
        <DisplayLogo />
      </div>
      <br></br>
      <div className="flex justify-center transform -mb-80">
        <img
          src={goldenWinnerCup}
          alt="goldenWinnerCup"
          className="w-60 opacity-30"
        />
      </div>
      <div className="flex justify-center transform">
        <img
          src={star}
          alt="goldenWinnerCup"
          className="md:w-60 hidden  md:visible"
        />
        <div className="text-center mt-10">
          <h2 className="text-white md:text-8xl text-6xl font-bold">
            {playerName}
          </h2>
          <h2 className="text-white md:text-7xl text-5xl font-bold">Winner</h2>
        </div>
        <img
          src={star}
          alt="goldenWinnerCup"
          className="md:w-60 hidden  md:visible"
        />
      </div>
      <div className="absolute inset-x-0 bottom-10">
        <button
          className="text-white bg-primary text-3xl w-80 md:w-96 lg:w-122 font-bold rounded-xl h-full border-white"
          onClick={() => navigate(BASE_PATH)}
        >
          Home Screen
        </button>
      </div>
    </div>
  );
};

export default TournamentWin;
