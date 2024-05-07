//By Anand Vannalath
//This runs match between two players and then returns the winning player. Additionally, it provides information
//to player1 and player2 as to who is the winner and loser and updates the number of spectactors, etc.

import Player from "./actors/player";
import { gameSessionManager } from "./gameSessionManager";

//This manages the round for 2 players who play up to 5 game
export class roundSessionManager {
  public game: gameSessionManager;
  public player1: Player;
  public player2: Player;

  constructor(game: gameSessionManager, player1: Player, player2: Player) {
    this.game = game;
    this.player1 = player1;
    this.player2 = player2;
  }

  //Setters
  public setPlayer1(player1: Player) {
    this.player1 = player1;
  }

  public setPlayer2(player2: Player) {
    this.player2 = player2;
  }

  //This simulates the duels
  public runRound() {
    for (let index = 0; index < 3; index++) {
      this.game.playRound(this.player1.getChoice(), this.player2.getChoice());
    }
  }

  //Checks if player1 wins
  private checkPlayer1Win(): Player | null {
    if (this.player1.getInGamePoints() > this.player2.getInGamePoints()) {
      this.player1.incrementNumSpectators(this.player2.getNumSpectators() + 1); //The +1 is the loser of this round
      this.player2.lostMatch(this.player1.getId());
      this.player1.resetIngamePoints(); //Resets win streak for next duel
      this.player2.resetIngamePoints();
      return this.player1;
    }
    return null;
  }

  //Checks if player2 wins
  private checkPlayer2Win(): Player | null {
    if (this.player1.getInGamePoints() < this.player2.getInGamePoints()) {
      this.player2.incrementNumSpectators(this.player1.getNumSpectators() + 1); //The +1 is the loser of this round
      this.player1.lostMatch(this.player1.getId());
      this.player1.resetIngamePoints(); //Rests the win streak for next duel
      this.player2.resetIngamePoints();
      return this.player2;
    }
    return null;
  }

  //Checks if there is a draw
  private checkDraw(): Player | null {
    if (this.player1.getInGamePoints() === this.player2.getInGamePoints()) {
      let endAlert = false;
      while (!endAlert) {
        //Runs until one of the players wins using singular duels
        this.game.playRound(this.player1.getChoice(), this.player2.getChoice());
        if (this.player1.getInGamePoints() !== this.player2.getInGamePoints()) {
          endAlert = true;
        }
      }
      let winner = null; //Returns if player1 wins or player2 wins
      winner = this.checkPlayer1Win();

      if (winner === null) {
        winner = this.checkPlayer2Win();
      }
      return winner;
    }
    return null; //Returns if no draw occurs
  }

  public run() {
    this.runRound(); //Runs the duels

    let winner = null;

    winner = this.checkDraw();
    if (winner === null) {
      winner = this.checkPlayer1Win(); //If players1 wins, player1 is returned
      if (winner === null) {
        winner = this.checkPlayer2Win(); //if player2 wins, player2 is returned
      }
    }

    return winner;
  }
}
