import { PongMatch } from "src/model/matches/pongMatch";
import { PongPowerup } from "./pongPowerup";
import { pongPaddleMovementSocket } from "src/controllers/socket/pongPaddleMovement";
import { tournamentMap } from "src/store";
import { Socket } from "socket.io";

export class ReversedPaddleControls implements PongPowerup {
  name: string;
  socket: Socket;

  constructor(socket: Socket) {
    this.name = "reversedPaddleControls";
    this.socket = socket;
  }

  activate(match: PongMatch): void {
    const isPlayerOne = match.ballState.yVelocity > 0;

    const playerOneId = match.players[0].userID;

    pongPaddleMovementSocket(match.tournament.hostUID,playerOneId,true,true,true);



  }
}
