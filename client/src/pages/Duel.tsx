//This is responsible for loading the Duel and showing the result of the Duel
//By Anand Vannalath

import DuelMove from "../components/Duel/DuelMove.tsx";
import DuelLoad from "../components/Duel/DuelLoad.tsx";
import PlayerAndSpectatorsInfo from "../components/Player/PlayerAndSpectatorsInfo.tsx";
import { Result } from "../types/index.ts";
import { Action } from "../../../types/types";

interface Props {
  playerName: string;
  opponentName: string;
  score1: number;
  score2: number;
  result: Result;
  move: Action;
  spectatorCount: number;
  phase: number;
}

const Duel = ({
  playerName,
  opponentName,
  score1,
  score2,
  result,
  move,
  spectatorCount,
  phase,
}: Props) => {
  if (phase === 4) {
    return (
      <div>
        <DuelMove score1={score1} score2={score2} move={move} result={result} />
        <PlayerAndSpectatorsInfo
          playerScore={score1}
          opponentScore={score2}
          playerName={playerName}
          opponentName={opponentName}
          spectatorCount={spectatorCount}
        />
      </div>
    );
  } else {
    return (
      <div>
        <DuelLoad phase={phase} />
        <PlayerAndSpectatorsInfo
          playerScore={score1}
          opponentScore={score2}
          playerName={playerName}
          opponentName={opponentName}
          spectatorCount={spectatorCount}
        />
      </div>
    );
  }
};

export default Duel;
