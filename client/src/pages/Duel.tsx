import PlayerName from "../components/DuelName.tsx";
import PlayerMove from "../components/DuelMove.tsx";
import PlayerScore from "../components/DuelScore.tsx";
import PlayerLoad from "../components/DuelLoad.tsx";

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
    return <PlayerLoad phase={phase}/>
  }
  else if (phase === 1) {
    return <PlayerLoad phase={phase}/>
  }
  else if (phase === 2) {
    return <PlayerLoad phase={phase}/>
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
        <UpdatePhase phase={2} player1Win={player1Win} player1Type={player1Type} player2Type={player2Type} 
          player1Score={player1Score} player2Win={player2Win} player2Score={player2Score} matchResult={matchResult}/>
      <div>
        <PlayerName name={player2Name} playerNum={2}/>
      </div>
    </div>
  );
};

export default duelMatchEndScreen;