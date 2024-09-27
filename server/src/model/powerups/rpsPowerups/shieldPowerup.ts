import { RpsMatch } from "../../matches/rpsMatch";
import Powerup from "./powerup";

export default class ShieldPowerup extends Powerup {
  constructor() {
    const name = "Shield Powerup";
    const descr = "This powerup prevents the player from losing the round";
    super(name, descr, true, false, 2);
  }

  usePowerup(rpsMatch: RpsMatch, p1Activate: boolean): void {
    //check who activated. check the opponent. if the opponent would win, set the win to false.
    if (p1Activate) {
      if (rpsMatch.p2wins) rpsMatch.p2wins = false;
    }
    else if (rpsMatch.p1wins) rpsMatch.p1wins = false;
  }
}
