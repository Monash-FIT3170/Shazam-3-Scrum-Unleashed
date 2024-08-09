import { tournamentMap } from "../../store";
import { PongMatch } from "../../model/pongMatch";

export const pongPaddleMovementSocket = (
  tournamentCode: string,
  playerID: string,
  start: boolean,
  left: boolean,
) => {
  const match = tournamentMap.get(tournamentCode)?.getMatch(playerID);

  if (match === undefined) {
    console.error("Player not found for paddle movement");
    return;
  }

  const pongMatch = match as PongMatch;

  let i = 0;
  for (; i < pongMatch.players.length; i++) {
    if (pongMatch.players[i].userID == playerID) {
      break;
    }
  }

  if (start) {
    if (left) {
      pongMatch.paddleStates[i].direction = -1;
    } else {
      pongMatch.paddleStates[i].direction = 1;
    }
  } else {
    if (left && pongMatch.paddleStates[i].direction == -1) {
      pongMatch.paddleStates[i].direction = 0;
    } else if (!left && pongMatch.paddleStates[i].direction == 1) {
      pongMatch.paddleStates[i].direction = 0;
    }
  }
};
