import Player from "./player";
import { Action } from "../../../types/types";

export class Match {
  public players: Player[];
  public matchRoomID: string;
  public duelsToWin: number;
  public timeOutHandler: NodeJS.Timeout | null;

  constructor(players: Player[], matchRoomID: string, duelsToWin: number) {
    this.players = players;
    this.matchRoomID = matchRoomID;
    this.duelsToWin = duelsToWin;
    this.timeOutHandler = null;
  }

  public isDuelComplete() {
    for (const player of this.players) {
      if (player.actionChoice === null && !player.isBot) {
        return false;
      }
    }
    return true;
  }

  public getMatchWinner() {
    for (const player of this.players) {
      if (player.score >= this.duelsToWin) {
        return player;
      }
    }
    return null;
  }

  private rulesMap: Map<Action, Action> = new Map<Action, Action>([
    ["ROCK", "SCISSORS"],
    ["PAPER", "ROCK"],
    ["SCISSORS", "PAPER"],
  ]);

  public playDuel() {
    const player1 = this.players[0];
    const player2 = this.players[1];

    // Set bot action to always lose to player
    if (player1.isBot) {
      this.getBotAction(player1, player2);
    } else if (player2.isBot) {
      this.getBotAction(player2, player1);
    }

    if (player1.actionChoice !== player2.actionChoice) {
      if (this.rulesMap.get(player1.actionChoice) === player2.actionChoice) {
        player1.score++;
      } else {
        player2.score++;
      }
    }
  }

  public resetActions() {
    for (const player of this.players) {
      player.actionChoice = null;
    }
  }

  private getBotAction(bot: Player, player: Player) {
    const botMove = this.rulesMap.get(player.actionChoice);
    if (botMove === undefined) {
      console.error("Invalid move chosen by player");
      return;
    }
    bot.actionChoice = botMove;
  }

  public startTimeout(callback: (match: Match) => void) {
    this.timeOutHandler = setTimeout(
      () => {
        if (!this.isDuelComplete()) {
          for (const player of this.players) {
            if (player.actionChoice === null) {
              player.actionChoice = ["ROCK", "PAPER", "SCISSORS"][
                Math.floor(Math.random() * 3)
              ] as Action;
            }
          }
        }
        callback(this);
      },
      12000 + Math.random() * 100,
    );
  }
}
