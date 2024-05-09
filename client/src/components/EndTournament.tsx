import cup from "../assets/GoldenWinnerCup.svg";

const EndTournament = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={cup} alt="cup" className="w-60 h-30 mb-4" />
      <div className="text-center mb-4">
        <h2 className="text-white text-4xl font-bold">YOU WON!</h2>
      </div>
    </div>
  );
};

export default EndTournament;