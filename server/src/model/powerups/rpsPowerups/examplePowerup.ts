//just an example powerup to show how to create a new powerup

import { RpsMatch } from "../../matches/rpsMatch";
import Powerup from "./powerup";

export default class ExamplePowerup extends Powerup {
  constructor() {
    const name = "Example Powerup (Coin Flip)";
    const descr =
      "This is an example powerup that sets one of the player's scores to 0 decided by coin flip, because funny";
    //i put the long bits into consts first just so its less messy to read and edit in the future. could do the same with the bools
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
