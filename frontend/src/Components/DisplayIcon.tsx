import rock from "../assets/Rock.svg";
import paper from "../assets/Paper.svg";
import scissors from "../assets/Scissors.svg";

const DisplayIcon = () => {
  return (
    <div>
      <div className="flex justify-center transform scale-150">
        <img src={rock} alt="Rock" className="w-16 h-16" />
        <img src={paper} alt="Paper" className="w-16 h-16 -mt-4 mb-4" />
        <img src={scissors} alt="Scissors" className="w-16 h-16" />
      </div>
      <h1 className="text-white text-4xl font-sans">ROCK PAPER</h1>
      <h1 className="text-white text-6xl font-bold">SHAZAM!</h1>
    </div>
  );
};

export default DisplayIcon;
