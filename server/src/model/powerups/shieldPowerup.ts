import { RpsMatch } from "../matches/rpsMatch";
import Powerup from "./powerup";

export default class ShieldPowerup extends Powerup {
  constructor() {
    const name = "Shield Powerup";
    const descr = "This powerup prevents the player to lose the round";
    super(name, descr, true, false);
  }

  usePowerup(rpsMatch: RpsMatch): void {
    const P1 = rpsMatch.players[0];
    const P2 = rpsMatch.players[1];
    const coinFlip = Math.random() >= 0.5;
    if (coinFlip) {
      P1.score = 0;
    } else {
      P2.score = 0;
    }
  }
}