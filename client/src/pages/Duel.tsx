//This is responsible for loading the Duel and showing the result of the Duel
//By Anand Vannalath

import DuelName from "../components/DuelName.tsx";
import DuelMove from "../components/DuelMove.tsx";
import DuelLoad from "../components/DuelLoad.tsx";

interface Props {
  player1Name: string;
  player2Name: string;
  phase: number;
  move: string;
  score1: number;
  score2: number;
  result: string;
}

interface PhaseProps {
  phase: number;
  move: string;
  score1: number;
  score2: number;
  result: string;
}

function UpdatePhase({ phase, move, score1, score2, result }: PhaseProps) {
  if (phase === 4) {
    return (
      <DuelMove score1={score1} score2={score2} move={move} result={result} />
    );
  } else {
    return <DuelLoad phase={phase} />;
  }
}

const Duel = ({
  player1Name,
  player2Name,
  phase,
  move,
  score1,
  score2,
  result,
}: Props) => {
  return (
    <div>
      <UpdatePhase
        phase={phase}
        move={move}
        score1={score1}
        score2={score2}
        result={result}
      />
      <DuelName name1={player1Name} name2={player2Name} />
    </div>
  );
};

export default Duel;
