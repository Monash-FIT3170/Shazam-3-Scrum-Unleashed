import { PongMatch } from "src/model/matches/pongMatch";
import { PongPowerup } from "./pongPowerup";

export class ShrinkPaddle implements PongPowerup {
  name: string;

  constructor() {
    this.name = "smallerPaddle";
  }
  activate(match: PongMatch): void {
    const isPlayerOne = match.ballState.yVelocity > 0;
    match.paddleStates[Number(isPlayerOne)].width = 10;
  }

  deactivate(match: PongMatch): void {
    const isPlayerOne = match.ballState.yVelocity > 0;
    match.paddleStates[Number(isPlayerOne)].width = 20;
  }
}
