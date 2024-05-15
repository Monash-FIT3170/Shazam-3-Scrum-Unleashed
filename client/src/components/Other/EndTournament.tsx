import crown from "../assets/Crown.svg";

interface EndTournamentProps {
  player: string;
}

const EndTournament = ({ player }: EndTournamentProps) => {
  return (
    <div className="flex flex-col items-center">
      <img src={crown} alt="crown" className="w-40 h-20 mb-2" />
      <div className="text-center mb-2">
        <h2 className="text-white text-7xl font-bold">{player}</h2>
      </div>
      <div className="text-center mb-4">
        <p className="text-white text-xl font-bold mt-5">
          HAS WON THE TOURNAMENT
        </p>
        <p className="text-white text-lg font-bold mt-20">
          BETTER LUCK NEXT TIME!
        </p>
      </div>
    </div>
  );
};

export default EndTournament;
