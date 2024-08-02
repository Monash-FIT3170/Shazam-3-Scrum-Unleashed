import Player from "./player";
import { Action } from "../../../types/types";
import { type Match } from "./match";
import { Server } from "socket.io";
import { Events } from "../../../types/socket/events";
import { playDuel } from "../controllers/socket/chooseAction";
import Tournament from "./tournament";

export class RpsMatch implements Match {
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
      if (player.gameData === null && !player.isBot) {
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

    if (player1.gameData !== player2.gameData) {
      if (this.rulesMap.get(player1.gameData as Action) === player2.gameData) {
        player1.score++;
      } else {
        player2.score++;
      }
    }
  }

  public resetActions() {
    for (const player of this.players) {
      player.gameData = null;
    }
  }

  private getBotAction(bot: Player, player: Player) {
    const botMove = this.rulesMap.get(player.gameData as Action);
    if (botMove === undefined) {
      console.error("Invalid move chosen by player");
      return;
    }
    bot.gameData = botMove;
  }

  public startTimeout(
    callback: (match: RpsMatch) => void,
    timeoutDuration: number,
  ) {
    this.timeOutHandler = setTimeout(
      () => {
        if (!this.isDuelComplete()) {
          const [player1, player2] = this.players;
          if (player1.gameData === null && player2.gameData === null) {
            let modifier = 0;
            if (Math.random() < 0.5) {
              modifier = 1;
            } else {
              modifier = -1;
            }
            const player1ActionIndex = Math.floor(Math.random() * 3);
            player1.gameData = ["ROCK", "PAPER", "SCISSORS"][
              player1ActionIndex
            ] as Action;
            player2.gameData = ["ROCK", "PAPER", "SCISSORS"].at(
              (player1ActionIndex + modifier) % 3,
            ) as Action;
          } else {
            if (player1.gameData === null) {
              const player1Action = this.rulesMap.get(
                player2.gameData as Action,
              );
              if (player1Action !== undefined) {
                player1.gameData = player1Action;
              }
            } else {
              const player2Action = this.rulesMap.get(
                player1.gameData as Action,
              );
              if (player2Action !== undefined) {
                player2.gameData = player2Action;
              }
            }
          }
        }
        callback(this);
      },
      timeoutDuration + Math.random() * 100,
    );
  }

  emitGameData(io: Server<Events>, tournament: Tournament): void {
    io.to(this.matchRoomID).emit("MATCH_INFO", this.players, false, null);
    this.startTimeout(playDuel(tournament, io), tournament.duelTime);
  }

  completeDuel(io: Server<Events>, tournament: Tournament) {
    if (this.timeOutHandler) {
      clearTimeout(this.timeOutHandler);
    }
    playDuel(tournament, io)(this);
  }
}
