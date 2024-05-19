import rockPaperShazam from "../../assets/RockPaperShazam.svg";

const TournamentBracketBanner = () => {
  return (
    <div className="w-full flex flex-row justify-center items-center py-4 px-5 gap-10">
      <img src={rockPaperShazam} alt={"Rock Paper Shazam"} />
    </div>
  );
};

export default TournamentBracketBanner;
