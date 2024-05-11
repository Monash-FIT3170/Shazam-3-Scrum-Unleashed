import PlayerName from "./PlayerNameMobile";
import StarsInfo from "./StarsInfo";
import SpectatorCount from "./SpectatorCount";

type PlayerAndSpectatorsInfoProps = {
    playerScore: number;
    opponentScore: number;
    playerName: string;
    opponentName: string;
    spectatorCount: number;
  };

const PlayerAndSpectatorsInfo = ({ 
    playerScore = 3,
    opponentScore = 2,
    playerName = "SPONGEBOB",
    opponentName = "PATRICK",
    spectatorCount = 32,
}: PlayerAndSpectatorsInfoProps) => {
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

export default PlayerAndSpectatorsInfo;