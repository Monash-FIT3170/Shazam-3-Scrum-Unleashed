import PlayerName1 from "../components/PlayerNameMobile1";
import PlayerName2 from "../components/PlayerNameMobile2";
import PlayerMove from "../components/PlayerMoveMobile";
import PlayerScore from "../components/PlayerScoreMobile";

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

const duelMatchEndScreen = ({player1Name, player1Win, player1Type, player1Score, player2Name, player2Win, player2Type, player2Score, matchResult}: Props) => {
  return (
    <div>
      <div>
        <PlayerMove type={player1Type} win={player1Win}/>
      </div>
      <div>
        <PlayerName1 name={player1Name}/>
      </div>
      <div>
        <PlayerScore player1Score={player1Score} player2Score={player2Score} matchResult={matchResult}/>
      </div>
      <div>
        <PlayerName2 name={player2Name}/>
      </div>
      <div>
        <PlayerMove type={player2Type} win={player2Win}/>
      </div>
    </div>
  );
};

export default duelMatchEndScreen;