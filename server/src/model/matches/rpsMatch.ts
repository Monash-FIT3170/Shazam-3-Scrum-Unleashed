import Player from "../player";
import { Action } from "../../../../types/types";
import { type Match } from "./match";
import { Server } from "socket.io";
import { Events } from "../../../../types/socket/events";
import { playDuel } from "../../controllers/socket/chooseAction";
import Tournament from "../tournament";
import * as crypto from "node:crypto";

export class RpsMatch implements Match {
  players: Player[];
  p1Action: Action;
  p2Action: Action;
  matchRoomID: string;
  duelsToWin: number;
  timeOutHandler: NodeJS.Timeout | null;
  powerUp: boolean[] | null;

  private rulesMap: Map<Action, Action> = new Map<Action, Action>([
    ["ROCK", "SCISSORS"],
    ["PAPER", "ROCK"],
    ["SCISSORS", "PAPER"],
  ]);

  constructor(players: Player[], duelsToWin: number) {
    this.players = players;
    this.p1Action = null;
    this.p2Action = null;
    this.matchRoomID = crypto.randomUUID();
    this.duelsToWin = duelsToWin;
    this.timeOutHandler = null;
    this.powerUp = null;
  }

  public isDuelComplete() {
    return (
      (this.p1Action !== null || this.players[0].isBot) &&
      (this.p2Action !== null || this.players[1].isBot)
    );
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
      this.p1Action = this.getBotAction(this.p2Action);
    }

    if (player2.isBot) {
      this.p2Action = this.getBotAction(this.p1Action);
    }

    if (this.p1Action !== this.p2Action) {
      if (this.rulesMap.get(this.p1Action) === this.p2Action) {
        player1.score++;
      } else {
        player2.score++;
      }
    }
  }

  public resetActions() {
    this.p1Action = null;
    this.p2Action = null;
  }

  private getBotAction(action: Action): Action {
    const botMove = this.rulesMap.get(action);
    if (botMove !== undefined) {
      return botMove;
    }

    // this case can now happen when two bots verse each other, or if the player action is not valid for some reason
    return "ROCK";
  }

  public startTimeout(
    callback: (match: RpsMatch) => void,
    timeoutDuration: number,
  ) {
    this.timeOutHandler = setTimeout(
      () => {
        if (!this.isDuelComplete()) {
          if (this.p1Action === null && this.p2Action === null) {
            let modifier = 0;
            if (Math.random() < 0.5) {
              modifier = 1;
            } else {
              modifier = -1;
            }
            const player1ActionIndex = Math.floor(Math.random() * 3);

            this.p1Action = ["ROCK", "PAPER", "SCISSORS"][
              player1ActionIndex
            ] as Action;

            this.p2Action = ["ROCK", "PAPER", "SCISSORS"].at(
              (player1ActionIndex + modifier) % 3,
            ) as Action;
          } else {
            if (this.p1Action === null) {
              const player1Action = this.rulesMap.get(this.p2Action);
              if (player1Action !== undefined) {
                this.p1Action = player1Action;
              }
            } else {
              const player2Action = this.rulesMap.get(this.p1Action);
              if (player2Action !== undefined) {
                this.p2Action = player2Action;
              }
            }
          }
        }
        callback(this);
      },
      timeoutDuration + Math.random() * 100,
    );
  }

  startMatch(io: Server<Events>, tournament: Tournament): void {
    io.to(this.matchRoomID).emit("MATCH_START", this.players, "RPS");
    // placing the powerup spawn here only has it spawn on the first round of the duel
    this.spawnPowerup(io);
    this.startTimeout(playDuel(tournament, io), tournament.duelTime);
  }

  completeDuel(io: Server<Events>, tournament: Tournament) {
    if (this.timeOutHandler) {
      clearTimeout(this.timeOutHandler);
    }
    playDuel(tournament, io)(this);
  }

  spawnPowerup(io: Server<Events>) {
    const powerUpLocations = [false, false, false];
    const location = Math.floor(Math.random() * 3);
    powerUpLocations[location] = true;
    this.powerUp = powerUpLocations;
    io.to(this.matchRoomID).emit("MATCH_POWERUP_SPAWN_LOCATION", this.powerUp);
  }
}
