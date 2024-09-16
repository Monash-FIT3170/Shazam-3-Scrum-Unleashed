import Player from "../player";
import { Action } from "../../../../types/types";
import { Server } from "socket.io";
import { Events } from "../../../../types/socket/events";
import { playDuel } from "../../controllers/socket/chooseAction";
import Tournament from "../tournament";
import { Match } from "./match";
import { MatchType } from "../../../../types/socket/eventArguments";
import Powerup from "../powerups/rpsPowerups/powerup";
import MovekillerPowerup from "../powerups/rpsPowerups/moveKillerPowerup";
import ShieldPowerup from "../powerups/rpsPowerups/shieldPowerup";
import TiebreakerPowerup from "../powerups/rpsPowerups/tiebreakerPowerup";

export class RpsMatch implements Match {
  players: Player[];
  matchRoomID: string;
  duelsToWin: number;
  roundCounter: number;
  p1Action: Action;
  p2Action: Action;
  timeOutHandler: NodeJS.Timeout | null;
  powerupEnabled: boolean;
  powerupLocation: boolean[] | null;
  powerup: Powerup | null;
  playerPowerups: (Powerup | null)[];

  private rulesMap: Map<Action, Action> = new Map<Action, Action>([
    ["ROCK", "SCISSORS"],
    ["PAPER", "ROCK"],
    ["SCISSORS", "PAPER"],
  ]);

  private powerupList: Powerup[] = [new MovekillerPowerup(), new ShieldPowerup(), new TiebreakerPowerup()];

  constructor(players: Player[], duelsToWin: number, powerupEnabled = false) {
    this.players = players;
    this.duelsToWin = duelsToWin;
    this.matchRoomID = crypto.randomUUID();
    this.p1Action = null;
    this.p2Action = null;
    this.timeOutHandler = null;
    this.powerupLocation = null;
    this.powerup = null;
    this.powerupEnabled = powerupEnabled;
    this.playerPowerups = [null, null];
    this.roundCounter = 0;
  }

  public isDuelComplete() {
    return (
      (this.p1Action !== null || this.players[0].isBot) &&
      (this.p2Action !== null || this.players[1].isBot)
    );
  }

  public updateScores() {
    const actions = ["ROCK", "PAPER", "SCISSORS"];
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

      if (this.powerupLocation) {
        const p1Index = actions.findIndex((action) => action === this.p1Action);
        const p2Index = actions.findIndex((action) => action === this.p2Action);
        if (this.powerupLocation[p1Index]) {
          const player2Powerup = this.playerPowerups[1];
          this.playerPowerups = [this.powerup, player2Powerup];
        } else if (this.powerupLocation[p2Index]) {
          const player1Powerup = this.playerPowerups[0];
          this.playerPowerups = [player1Powerup, this.powerup];
        }
      }
      // checking whether the powerup has been allocated to a player
      console.log(this.playerPowerups[0]);
      console.log(this.playerPowerups[1]);
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
    io.to(this.matchRoomID).emit(
      "MATCH_START",
      this.players,
      this.type(),
      tournament.duelTime / 1000,
    );
    // removing the player's previous powerups
    this.players[0].powerup = null;
    this.players[1].powerup = null;
    this.startTimeout(playDuel(tournament, io), tournament.duelTime + 4000);
  }

  emitMatchState(): void {
    // currently not really needed, probs needed for the power version, if we have multiple stages of the game
    // as the users will need to know what stage it is currently.
  }

  // change the value of the powerupEnabled to true to enable powerups
  // this is only for testing purposes and should be a user input in the final version
  completeDuel(io: Server<Events>, tournament: Tournament) {
    if (this.timeOutHandler) {
      clearTimeout(this.timeOutHandler);
    }
    // spawn a powerup halfway through the match
    if (this.roundCounter === this.duelsToWin && this.powerupEnabled) {
      this.spawnPowerup(io);
    }
    // for testing purposes spawn a powerup every round after first
    if (this.powerupEnabled) {
      this.spawnPowerup(io);
    }
    playDuel(tournament, io)(this);
  }

  spawnPowerup(io: Server<Events>) {
    const powerupLocations = [false, false, false];
    const location = Math.floor(Math.random() * 3);
    powerupLocations[location] = true;
    this.powerupLocation = powerupLocations;
    this.powerupList[Math.floor(Math.random() * this.powerupList.length)]
    io.to(this.matchRoomID).emit("MATCH_POWERUP_SPAWN_LOCATION", this.powerupLocation);
  }
  
  type(): MatchType {
    return "RPS";
  }

  getMatchWinner(): Player | null {
    if (
      this.players[0].score >= this.duelsToWin ||
      this.players[1].isEliminated
    ) {
      this.players[1].isEliminated = true;
      return this.players[0];
    } else if (
      this.players[1].score >= this.duelsToWin ||
      this.players[0].isEliminated
    ) {
      this.players[0].isEliminated = true;
      return this.players[1];
    } else {
      return null;
    }
  }

  clearTimeouts() {
    if (this.timeOutHandler) {
      clearTimeout(this.timeOutHandler);
    }
  }
}
