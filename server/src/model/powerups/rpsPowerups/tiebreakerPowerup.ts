import { RpsMatch } from "../../matches/rpsMatch";
import Powerup from "./powerup";

export default class TiebreakerPowerup extends Powerup {
  constructor() {
    const name = "Tiebreaker Powerup";
    const descr =
      "This powerup enables the player to win the round if it is a tie";
    super(name, descr, true, false, 1);
  }

  usePowerup(rpsMatch: RpsMatch, p1Activate: boolean): void {
    //check if the round is a tie. if it is, set the player who activated the powerup to win.
    if (rpsMatch.p1wins === rpsMatch.p2wins) {
      if (p1Activate) {
        rpsMatch.p1wins = true;
        rpsMatch.p2wins = false;
      } else {
        rpsMatch.p2wins = true;
        rpsMatch.p1wins = false;
      }
    }
  }
}
