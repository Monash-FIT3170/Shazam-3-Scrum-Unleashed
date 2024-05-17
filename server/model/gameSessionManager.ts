import Player from "./actors/player";
import { Action } from "../../types/types";

export class GameSessionManager {
  public player1: Player;
  public player2: Player;
  private static rules: Record<Action, Action> = {
    ROCK: "SCISSORS",
    PAPER: "ROCK",
    SCISSORS: "PAPER",
    NONE: "NONE",
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
    if (player1Choice === "NONE" && player2Choice !== "NONE") {
      this.player2.incrementInGamePoints();
      return this.player2;
    }
    if (player2Choice === "NONE" && player1Choice !== "NONE") {
      this.player1.incrementInGamePoints();
      return this.player1;
    }
    if (player1Choice === "NONE" && player2Choice === "NONE") {
      this.player1.incrementInGamePoints();
      return this.player1;
    }
    if (GameSessionManager.rules[player1Choice] == player2Choice) {
      this.player1.incrementInGamePoints();
      return this.player1;
    } else if (player1Choice == player2Choice) {;
      return null;
    } else {
      this.player2.incrementInGamePoints();
      return this.player2;
    }
  }
}
