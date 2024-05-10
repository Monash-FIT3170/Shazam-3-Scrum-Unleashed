import plainTrophy from "../assets/PlainTrophy.svg";
import cross from "../assets/Cross.svg";
import PlayerName from "../components/PlayerNameMobile";
import SpectatorCount from "../components/SpectatorCount";
import StarsInfo from "../components/StarsInfo";

type MatchOutcomeScreenProps = {
  playerScore: number;
  opponentScore: number;
  playerName: string;
  opponentName: string;
  spectatorCount: number;
  isWin: boolean;
};

const MatchOutcomeScreen = ({
  playerScore = 3,
  opponentScore = 2,
  playerName = "SPONGEBOB",
  opponentName = "PATRICK",
  spectatorCount = 32,
  isWin = true,
}: MatchOutcomeScreenProps) => {
  return (
    <div>
      <div className="block md:hidden">
        <PlayerName name={opponentName} isOpponent={true} />
      </div>
      <div className="hidden md:block">
        <StarsInfo
          playerName={opponentName}
          score={opponentScore}
          isOpponent={true}
        />
      </div>

      <div
        className={
          "fixed mx-auto max-w-max inset-x-0 scale-[0.85] sm:scale-[0.85] md:scale-[0.875] lg:scale-[0.90]" +
          ` top-[${isWin ? "5" : "10"}%]`
        }
      >
        <img
          src={isWin ? plainTrophy : cross}
          alt={isWin ? "PlainTrophy" : "RedCross"}
        />
      </div>

      <div className="text-white font-bold text-6xl fixed top-[39%] mx-auto max-w-max inset-x-0">
        <h1>{isWin ? "YOU WON!" : "YOU LOST!"}</h1>
      </div>
      <div className="text-white font-bold text-6xl fixed top-[51%] mx-auto max-w-max inset-x-0">
        <h1>
          <span className={isWin ? "text-[#65DB71]" : ""}>{playerScore}</span>
          {" - "}
          <span className={isWin ? "" : "text-[#FF5959]"}>{opponentScore}</span>
        </h1>
      </div>

      <div className="text-white font-bold text-2xl md:text-3xl fixed top-[66%] mx-auto max-w-max inset-x-0">
        {isWin ? (
          <p>
            <span className="text-[#FFC700]">{opponentName}</span> AND THEIR
            FOLLOWERS WILL NOW FOLLOW YOU!
          </p>
        ) : (
          <p>
            YOU AND YOUR FOLLOWERS WILL NOW FOLLOW{" "}
            <span className="text-[#FFC700]">{opponentName}</span>!
          </p>
        )}
      </div>
      <div className="text-white font-bold text-2xl md:text-3xl fixed top-[77%] mx-auto max-w-max inset-x-0">
        <p>WAITING FOR THE NEXT ROUND...</p>
      </div>

      <div className="block md:hidden">
        <PlayerName name={playerName} isOpponent={false} />
      </div>
      <div className="hidden md:block">
        <StarsInfo
          playerName={playerName}
          score={playerScore}
          isOpponent={false}
        />
      </div>
      <div className="hidden md:block">
        <SpectatorCount count={spectatorCount} />
      </div>
    </div>
  );
};

export default MatchOutcomeScreen;
