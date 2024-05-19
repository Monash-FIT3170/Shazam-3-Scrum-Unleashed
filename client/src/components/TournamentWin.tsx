import DisplayLogo from "../components/DisplayLogo";
import goldenWinnerCup from "../assets/GoldenWinnerCup.svg";
import star from "../assets/PlainStar.svg";

interface TournamentWinScreenProps {
  playerName: string;
}

const TournamentWin = ({ playerName }: TournamentWinScreenProps) => {
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
        <img src={star} alt="goldenWinnerCup" className="w-60" />
        <div className="text-center mt-10">
          <h2 className="text-white text-9xl font-bold">{playerName}</h2>
          <h2 className="text-white text-8xl font-bold">Winner</h2>
        </div>
        <img src={star} alt="goldenWinnerCup" className="w-60" />
      </div>
      <div className="absolute inset-x-0 bottom-10">
        <button className="text-white bg-primary text-3xl w-80 md:w-96 lg:w-122 font-bold rounded-xl h-full border-white">
          {"Host Another"}
        </button>
      </div>
    </div>
  );
};

export default TournamentWin;