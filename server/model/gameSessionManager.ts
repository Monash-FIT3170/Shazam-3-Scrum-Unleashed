import Player from "./actors/player";
import { Action } from "../../types/types";

export class gameSessionManager {
  public player1: Player;
  public player2: Player;
  private static rules: Record<Action, Action> = {
    ROCK: Action.Scissors,
    PAPER: Action.Rock,
    SCISSORS: Action.Paper,
    NONE: Action.None,
  };

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  public getPlayer1() {
    return this.getPlayer1;
  }

  public getPlayer2() {
    return this.getPlayer2;
  }

  public playRound(
    player1Choice: Action,
    player2Choice: Action,
  ): Player | null {
    if (gameSessionManager.rules[player1Choice] == player2Choice) {
      this.player1.incrementInGamePoints();
      return this.player1;
    } else if (player1Choice == player2Choice) {
      console.log("its a tie");
      return null;
    } else {
      this.player2.incrementInGamePoints();
      return this.player2;
    }
  }
}
