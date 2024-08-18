import Player from "../player";
import { Action, PlayerAttributes } from "../../../../types/types";
import { Server } from "socket.io";
import { Events } from "../../../../types/socket/events";
import { playDuel } from "../../controllers/socket/chooseAction";
import Tournament from "../tournament";
import { Match } from "./match";
import { MatchType } from "../../../../types/socket/eventArguments";

export class RpsMatch implements Match {
  players: PlayerAttributes[];
  matchRoomID: string;
  duelsToWin: number;
  p1Action: Action;
  p2Action: Action;
  timeOutHandler: NodeJS.Timeout | null;

  private rulesMap: Map<Action, Action> = new Map<Action, Action>([
    ["ROCK", "SCISSORS"],
    ["PAPER", "ROCK"],
    ["SCISSORS", "PAPER"],
  ]);

  constructor(players: Player[], duelsToWin: number) {
    this.players = players;
    this.duelsToWin = duelsToWin;
    this.matchRoomID = crypto.randomUUID();
    this.p1Action = null;
    this.p2Action = null;
    this.timeOutHandler = null;
  }

  public isDuelComplete() {
    return (
      (this.p1Action !== null || this.players[0].isBot) &&
      (this.p2Action !== null || this.players[1].isBot)
    );
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
    this.startTimeout(playDuel(tournament, io), tournament.duelTime);
  }

  emitMatchState(): void {
    // currently not really needed, probs needed for the power version, if we have multiple stages of the game
    // as the users will need to know what stage it is currently.
  }

  completeDuel(io: Server<Events>, tournament: Tournament) {
    if (this.timeOutHandler) {
      clearTimeout(this.timeOutHandler);
    }
    playDuel(tournament, io)(this);
  }

  type(): MatchType {
    return "RPS";
  }

  getMatchWinner(): Player | null {
    if (this.players[0].score >= this.duelsToWin) {
      this.players[1].isEliminated = true;
      return this.players[0];
    } else if (this.players[1].score >= this.duelsToWin) {
      this.players[0].isEliminated = true;
      return this.players[1];
    } else {
      return null;
    }
  }
}
