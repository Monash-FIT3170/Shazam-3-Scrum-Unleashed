import { RpsMatch } from "../../matches/rpsMatch";
import Powerup from "./powerup";

export default class MovekillerPowerup extends Powerup {
  constructor() {
    const name = "Movekiller Powerup";
    const descr = "This powerup disables an opponent's move";
    super(name, descr, false, true);
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
