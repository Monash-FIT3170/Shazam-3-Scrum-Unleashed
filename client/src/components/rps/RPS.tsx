import DuelOutcome from "../player-screen/outcome-screens/DuelOutcome.tsx";
import { PlayerAttributes } from "../../../../types/types.ts";
import ChoosePlayerMove from "../player-screen/choose-move/ChoosePlayerMove.tsx";
import {socket} from "../../App.tsx";
import {useEffect, useState} from "react";

type RPSProps = {
  tournamentCode: string;
  player: PlayerAttributes;
  opponent: PlayerAttributes;
};

const RPS = ({ tournamentCode, player, opponent}: RPSProps) => {
  const [duelComplete, setDuelComplete] = useState(false);

  useEffect(() => {
    socket.on("MATCH_SCORE_UPDATE", () => {
        setDuelComplete(true); // TODO fix,
    });
  }, []);

  if (duelComplete) {
      setTimeout(()=>{setDuelComplete(false)}, 3000)
      return <DuelOutcome userPlayer={player} opponent={opponent} />;
  } else {
      return <ChoosePlayerMove tournamentCode={tournamentCode} />;
  }
};

export { RPS };
