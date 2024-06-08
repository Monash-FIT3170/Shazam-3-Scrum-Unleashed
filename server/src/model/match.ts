import Player from "./player";
import { Action } from "../../../types/types";

export class Match {
  public players: Player[];
  public matchRoomID: string;
  public duelsToWin: number;
  public timeOutHandler: NodeJS.Timeout | null;

  private rulesMap: Map<Action, Action> = new Map<Action, Action>([
    ["ROCK", "SCISSORS"],
    ["PAPER", "ROCK"],
    ["SCISSORS", "PAPER"],
  ]);

  constructor(players: Player[], duelsToWin: number) {
    this.players = players;
    this.matchRoomID = crypto.randomUUID();
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

  public updateScores() {
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
          const [player1, player2] = this.players;
          if (player1.actionChoice === null && player2.actionChoice === null) {
            let modifier = 0;
            if (Math.random() < 0.5) {
              modifier = 1;
            } else {
              modifier = -1;
            }
            const player1ActionIndex = Math.floor(Math.random() * 3);
            player1.actionChoice = ["ROCK", "PAPER", "SCISSORS"][
              player1ActionIndex
            ] as Action;
            player2.actionChoice = ["ROCK", "PAPER", "SCISSORS"].at(
              (player1ActionIndex + modifier) % 3,
            ) as Action;
          } else {
            if (player1.actionChoice === null) {
              const player1Action = this.rulesMap.get(player2.actionChoice);
              if (player1Action !== undefined) {
                player1.actionChoice = player1Action;
              }
            } else {
              const player2Action = this.rulesMap.get(player1.actionChoice);
              if (player2Action !== undefined) {
                player2.actionChoice = player2Action;
              }
            }
          }
        }
        callback(this);
      },
      12000 + Math.random() * 100,
    );
  }
}
