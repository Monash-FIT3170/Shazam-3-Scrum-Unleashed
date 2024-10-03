import { PongMatch } from "src/model/matches/pongMatch";
import { PongPowerup } from "./pongPowerup";

export class ReversedPaddleControls implements PongPowerup {
  name: string;

  constructor() {
    this.name = "reversedPaddleControls";
  }

  activate(match: PongMatch): void {
    const isPlayerOne = match.ballState.yVelocity > 0;

    match.paddleStates[Number(isPlayerOne)].isReversedControl = true;

  }

  deactivate(match: PongMatch): void {
    const isPlayerOne = match.ballState.yVelocity > 0;
    match.paddleStates[Number(isPlayerOne)].isReversedControl = false;
  }
}