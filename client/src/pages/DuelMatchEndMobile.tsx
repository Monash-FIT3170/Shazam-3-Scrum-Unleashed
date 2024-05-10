import PlayerName from "../components/PlayerNameMobile1";
import PlayerMove from "../components/PlayerMoveMobile";
import PlayerScore from "../components/PlayerScoreMobile";
import shazamLogo from "../assets/Duel/SHAZAM.svg";

interface Props {
  player1Name: string;
  player1Win: boolean;
  player1Type: string;
  player1Score: number;
  player2Name: string;
  player2Win: boolean;
  player2Type: string;
  player2Score: number;
  matchResult: string;
}

interface PhaseProps {
  phase: number;
  player1Win: boolean;
  player1Type: string;
  player1Score: number;
  player2Win: boolean;
  player2Type: string;
  player2Score: number;
  matchResult: string;
}

function UpdatePhase({phase, player1Win, player1Type, player2Type, player2Win, player1Score, player2Score, matchResult}: PhaseProps) {
  if (phase === 0) {
    return <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
      <p className="text-8xl text-white font-bold font-sans">ROCK</p>
    </div>
  }
  else if (phase === 1) {
    return <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
      <p className="text-8xl text-white font-bold font-sans">PAPER</p>
    </div>
  }
  else if (phase === 2) {
    return <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
      <img className="object-cover" src={shazamLogo}/>
    </div>
  }
  else if (phase === 3) {
    return <div></div>
  }
  else if (phase === 4) {
    return <div>
      <div>
        <PlayerMove type={player1Type} win={player1Win}/>
      </div>
      <div>
        <PlayerMove type={player2Type} win={player2Win}/>
      </div>
      <div>
        <PlayerScore player1Score={player1Score} player2Score={player2Score} matchResult={matchResult}/>
      </div>
    </div>
  }
};

const duelMatchEndScreen = ({player1Name, player1Win, player1Type, player1Score, player2Name, player2Win, player2Type, player2Score, matchResult}: Props) => {
  return (
    <div>
      <div>
        <PlayerName name={player1Name} playerNum={1}/>
      </div>
        <UpdatePhase phase={4} player1Win={player1Win} player1Type={player1Type} player2Type={player2Type} 
          player1Score={player1Score} player2Win={player2Win} player2Score={player2Score} matchResult={matchResult}/>
      <div>
        <PlayerName name={player2Name} playerNum={2}/>
      </div>
    </div>
  );
};

export default duelMatchEndScreen;