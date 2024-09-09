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
  duelTime: number;
};

const RPS = ({
  tournamentCode,
  player,
  opponent,
  isPlayerOne,
  isSpectator,
  duelTime,
}: RPSProps) => {
  const [userAction, setUserAction] = useState<Action>();
  const [opponentAction, setOpponentAction] = useState<Action>();
  const [powerup, setPowerupLocation] = useState<boolean[]>([false, false, false]);

  socket.on("MATCH_POWERUP_SPAWN_LOCATION", (location: boolean[]) => {
    setPowerupLocation(location);
    console.log(location)
  })

  useEffect(() => {
    socket.on("MATCH_RPS_DUEL_STATE", (p1Action, p2Action) => {
      setUserAction(isPlayerOne ? p1Action : p2Action);
      setOpponentAction(isPlayerOne ? p2Action : p1Action);

      setTimeout(() => {
        setUserAction(undefined);
        setOpponentAction(undefined);
      }, 3000);
    });

    return () => {
      socket.off("MATCH_RPS_DUEL_STATE");
    };
  }, []);

  if (userAction && opponentAction) {
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
    return (
      <ChoosePlayerMove tournamentCode={tournamentCode} duelTime={duelTime} powerup={powerup}/>
    );
  }
};

export { RPS };
