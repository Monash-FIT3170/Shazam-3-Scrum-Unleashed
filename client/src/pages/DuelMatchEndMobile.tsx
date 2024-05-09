import PlayerName1 from "../components/PlayerNameMobile1";
import PlayerName2 from "../components/PlayerNameMobile2";

interface Props {
  playerName1: string;
  playerName2: string;
}

const DuelMatchEndScreen = ({playerName1, playerName2}: Props) => {
  return (
    <div>
      <div>
        <PlayerName1 name={playerName1}/>
      </div>
      <div>
        <PlayerName2 name={playerName2}/>
      </div>
    </div>
  );
};

export default DuelMatchEndScreen;