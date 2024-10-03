import { PongMatch } from "src/model/matches/pongMatch";
import { PongPowerup } from "./pongPowerup";

export class BiggerPaddle implements PongPowerup {
  name: string;

  constructor() {
    this.name = "biggerPaddle";
  }
  activate(match: PongMatch): void {
    const isPlayerTwo = match.ballState.yVelocity < 0;
    match.paddleStates[Number(isPlayerTwo)].width = 30;
  }

  deactivate(match: PongMatch): void {
    const isPlayerTwo = match.ballState.yVelocity < 0;
    match.paddleStates[Number(isPlayerTwo)].width = 20;
  }
}
