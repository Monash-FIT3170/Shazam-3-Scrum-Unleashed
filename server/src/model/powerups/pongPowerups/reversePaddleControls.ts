import { PongMatch } from "src/model/matches/pongMatch";
import { PongPowerup } from "./pongPowerup";

export class ReversePaddleControls implements PongPowerup {
  name: string;

  constructor() {
    this.name = "reversePaddleControls";
  }
  activate(match: PongMatch): void {
    // we need to get the player2:
    const isPlayerTwo = match.ballState.yVelocity < 0;
    
    // we need to reverse the controls the selected player:
    

  }
}