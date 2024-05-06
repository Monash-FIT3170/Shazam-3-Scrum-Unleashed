//By Anand Vannalath

import Player from "./actors/player"
import { gameSessionManager } from "./gameSessionManager"

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

  public setPlayer1(player1: Player) {
    this.player1 = player1
  }

  public setPlayer2(player2: Player) {
    this.player2 = player2
  }

  public runRound() {
    for (let index = 0; index < 5; index++) {
      this.game.playRound(this.player1.getChoice(), this.player2.getChoice());
    }
  };

  private checkPlayer1Win() {
    if (this.player1.getInGamePoints() > this.player2.getInGamePoints()) {
      this.player1.incrementNumSpectators(this.player2.getNumSpectators() + 1); //The +1 is the loser of this round
      this.player2.lostMatch(this.player1.getId()); 
      this.player1.resetIngamePoints(); //Resets win streak for next duel
      this.player2.resetIngamePoints();
    }
  }

  private checkPlayer2Win() {
    if (this.player1.getInGamePoints() < this.player2.getInGamePoints()) {
      this.player2.incrementNumSpectators(this.player1.getNumSpectators() + 1);
      this.player1.lostMatch(this.player1.getId());
      this.player1.resetIngamePoints(); //Rests the win streak for next duel
      this.player2.resetIngamePoints(); 
    }
  }

  private checkDraw() {
    if (this.player1.getInGamePoints() === this.player2.getInGamePoints()) {
      let endAlert = false;
      while (endAlert === false) {
        this.game.playRound(this.player1.getChoice(), this.player2.getChoice());
          if (this.player1.getInGamePoints() !== this.player2.getInGamePoints()) {
            endAlert = true;
          }
      } 
    }
    this.checkPlayer1Win();
    this.checkPlayer2Win();
  }

  public run() {
    this.runRound();
    this.checkDraw();
    this.checkPlayer1Win();
    this.checkPlayer2Win();
  }
}