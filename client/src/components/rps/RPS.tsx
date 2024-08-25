import DuelOutcome from "../player-screen/outcome-screens/DuelOutcome.tsx";
import { Action, PlayerAttributes } from "../../../../types/types.ts";
import ChoosePlayerMove from "../player-screen/choose-move/ChoosePlayerMove.tsx";
import { socket } from "../../App.tsx";
import { useEffect, useState } from "react";

type RPSProps = {
  tournamentCode: string;
  player: PlayerAttributes;
  opponent: PlayerAttributes;
  isPlayerOne: boolean;
  isSpectator: boolean;
};

const RPS = ({
  tournamentCode,
  player,
  opponent,
  isPlayerOne,
  isSpectator,
}: RPSProps) => {
  const [userAction, setUserAction] = useState<Action>();
  const [opponentAction, setOpponentAction] = useState<Action>();

  useEffect(() => {
    socket.on("MATCH_RPS_DUEL_STATE", (p1Action, p2Action) => {
      setUserAction(isPlayerOne ? p1Action : p2Action);
      setOpponentAction(isPlayerOne ? p2Action : p1Action);
    });
  }, []);

  if (userAction && opponentAction) {
    setTimeout(() => {
      setUserAction(undefined);
      setOpponentAction(undefined);
    }, 3000);
    return (
      <DuelOutcome
        userPlayer={player}
        opponent={opponent}
        userAction={userAction}
        opponentAction={opponentAction}
        isSpectator={isSpectator}
      />
    );
  } else {
    return <ChoosePlayerMove tournamentCode={tournamentCode} />;
  }
};

export { RPS };
