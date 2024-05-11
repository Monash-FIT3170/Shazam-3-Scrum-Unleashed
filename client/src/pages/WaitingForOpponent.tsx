import paper from "../assets/SemiTransparentPaper.svg";
import rock from "../assets/SemiTransparentRock.svg";
import scissors from "../assets/SemiTransparentScissors.svg";
import LoadingEffect from "../components/LoadingEffect";
import PlayerAndSpectatorsInfo from "../components/PlayerAndSpectatorsInfo";

type WaitingForOpponentProps = {
    playerScore: number;
    opponentScore: number;
    playerName: string;
    opponentName: string;
    spectatorCount: number;
    playerMove: string;
  };

const WaitingForOpponent = ({ 
    playerScore,
    opponentScore,
    playerName,
    opponentName,
    spectatorCount,
    playerMove = "rock"
}: WaitingForOpponentProps) => {
    return (
        <div>
            <PlayerAndSpectatorsInfo 
                playerScore = {playerScore} 
                opponentScore = {opponentScore}
                playerName = {playerName}
                opponentName = {opponentName}
                spectatorCount = {spectatorCount}
            />
            
            <LoadingEffect isOpponent={true}/>

            <div className="text-white font-bold text-4xl md:text-6xl fixed top-[45%] mx-auto max-w-max inset-x-0">
                <h1>WAITING FOR OPPONENT</h1>
            </div>
            <div className='mx-auto max-w-max inset-x-0 scale-75 md:scale-95 absolute -bottom-[345px] md:-bottom-[355px]'>
                <img src={
                    playerMove === "rock" ? rock
                    : playerMove === "paper" ? paper
                    : playerMove === "scissors" ? scissors
                    : ""
                } alt={`You chose ${
                    playerMove === "rock" ? "rock"
                    : playerMove === "paper" ? "paper"
                    : playerMove === "scissors" ? "scissors"
                    : "nothing"
                }`}/>
            </div>
        </div>
    );
};

export default WaitingForOpponent;