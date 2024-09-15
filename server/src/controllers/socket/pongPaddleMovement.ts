import { tournamentMap } from "../../store";
import { PongMatch } from "../../model/matches/pongMatch";

export const pongPaddleMovementSocket = (
  tournamentCode: string,
  playerID: string,
  start: boolean,
  left: boolean,
  reversedPaddleControls: boolean
) => {
  const match = tournamentMap.get(tournamentCode)?.getMatch(playerID);

  if (!match) {
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
  if(reversedPaddleControls){
    if (start) {
      if (left) {
        pongMatch.paddleStates[i].direction = -1*(-1);
      } else {
        pongMatch.paddleStates[i].direction = 1*(-1);
      }
    } else {
      if (left && pongMatch.paddleStates[i].direction == -1) {
        pongMatch.paddleStates[i].direction = 0;
      } else if (!left && pongMatch.paddleStates[i].direction == 1) {
        pongMatch.paddleStates[i].direction = 0;
      }
    }
  }
  else{
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
  }
  
};
