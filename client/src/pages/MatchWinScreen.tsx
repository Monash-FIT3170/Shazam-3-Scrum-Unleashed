import plainTrophy from "../assets/PlainTrophy.svg";
import PlayerName1 from "../components/PlayerNameMobile1";
import PlayerName2 from "../components/PlayerNameMobile2";
import SpectatorCount from "../components/SpectatorCount";
import StarsInfoPlayer from "../components/StarsInfoPlayer";
import StarsInfoOpponent from "../components/StarsInfoOpponent";

type MatchWinScreenProps = {
  playerScore: number;
  opponentScore: number;
  playerName: string;
  opponentName: string;
  spectatorCount: number;
};

const MatchWinScreen = ({
  playerScore = 3,
  opponentScore = 2,
  playerName = "SPONGEBOB",
  opponentName = "PATRICK",
  spectatorCount = 32,
}: MatchWinScreenProps) => {
  return (
    <div>
      <div className="block md:hidden">
        <PlayerName1 name={opponentName} />
      </div>
      <div className="hidden md:block">
        <StarsInfoOpponent opponentName={opponentName} score={opponentScore} />
      </div>
      <div className="fixed top-[5%] mx-auto max-w-max inset-x-0 scale-[0.85] sm:scale-[0.85] md:scale-[0.875] lg:scale-[0.90]">
        <img src={plainTrophy} alt="PlainTrophy" />
      </div>
      <div className="text-white font-bold text-6xl fixed top-[39%] mx-auto max-w-max inset-x-0">
        <h1>YOU WON!</h1>
      </div>
      <div className="text-white font-bold text-6xl fixed top-[51%] mx-auto max-w-max inset-x-0">
        <h1>
          <span className="text-[#65DB71]">{playerScore}</span> -{" "}
          {opponentScore}
        </h1>
      </div>
      <div className="text-white font-bold text-2xl md:text-3xl fixed top-[66%] mx-auto max-w-max inset-x-0">
        <p>
          <span className="text-[#FFC700]">{opponentName}</span> AND THEIR
          FOLLOWERS WILL NOW FOLLOW YOU!
        </p>
      </div>
      <div className="text-white font-bold text-2xl md:text-3xl fixed top-[77%] mx-auto max-w-max inset-x-0">
        <p>WAITING FOR THE NEXT ROUND...</p>
      </div>
      <div className="block md:hidden">
        <PlayerName2 name={playerName} />
      </div>
      <div className="hidden md:block">
        <StarsInfoPlayer playerName={playerName} score={playerScore} />
      </div>
      <div className="hidden md:block">
        <SpectatorCount count={spectatorCount} />
      </div>
    </div>
  );
};

export default MatchWinScreen;
