import Player from "../player";
import { Action, RPSPowerup, RPSPowerupSpawn } from "../../../../types/types";
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
  powerupSpawn: RPSPowerupSpawn | undefined;
  playerPowerups: (Powerup | null)[];
  p1wins: boolean;
  p2wins: boolean;

  private rulesMap: Map<Action, Action> = new Map<Action, Action>([
    ["ROCK", "SCISSORS"],
    ["PAPER", "ROCK"],
    ["SCISSORS", "PAPER"],
  ]);

  constructor(players: Player[], duelsToWin: number, powerupEnabled = false) {
    this.players = players;
    this.duelsToWin = duelsToWin;
    this.matchRoomID = crypto.randomUUID();
    this.p1Action = null;
    this.p2Action = null;
    this.timeOutHandler = null;
    this.powerupSpawn = undefined;
    this.powerupEnabled = false;
    this.playerPowerups = [null, null];
    this.roundCounter = 0;
    this.p1wins = false;
    this.p2wins = false;
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
    const scorePowerupPrio = [-1, -1];
    this.p1wins = false;
    this.p2wins = false;

    // Set bot action to always lose to player
    if (player1.isBot) {
      this.p1Action = this.getBotAction(this.p2Action);
    }

    if (player2.isBot) {
      this.p2Action = this.getBotAction(this.p1Action);
    }

    if (this.p1Action !== this.p2Action) {
      if (this.rulesMap.get(this.p1Action) === this.p2Action) {
        this.p1wins = true;
      } else {
        this.p2wins = true;
      }

      //now check the list of powerups and apply them, using the lower priority powerup first. check not null, and if they are not instant use
      //check the priority of each powerup, check if the powerup is not null, and check if the powerup is not instant use. put the priority of the powerup in the array to track
      if (
        this.playerPowerups[0] !== null &&
        !this.playerPowerups[0].instantUse
      ) {
        scorePowerupPrio[0] = this.playerPowerups[0].priority;
      }
      if (
        this.playerPowerups[1] !== null &&
        !this.playerPowerups[1].instantUse
      ) {
        scorePowerupPrio[1] = this.playerPowerups[1].priority;
      }
      //if the first powerup has a lower priority and is not -1, use it. then use the next powerup.
      if (scorePowerupPrio[0] <= scorePowerupPrio[1]) {
        //this long if statement first checks it isnt null. and then checks if it is not an instant use (meaning it is used at the end of the round)
        if (
          this.playerPowerups[0] !== null &&
          !this.playerPowerups[0].instantUse
        )
          this.playerPowerups[0].usePowerup(this, true);
        if (
          this.playerPowerups[1] !== null &&
          !this.playerPowerups[1].instantUse
        )
          this.playerPowerups[1].usePowerup(this, false);
      } else if (scorePowerupPrio[1] < scorePowerupPrio[0]) {
        if (
          this.playerPowerups[1] !== null &&
          !this.playerPowerups[1].instantUse
        )
          this.playerPowerups[1].usePowerup(this, false);
        if (
          this.playerPowerups[0] !== null &&
          !this.playerPowerups[0].instantUse
        )
          this.playerPowerups[0].usePowerup(this, true);
      }

      //now depending on what the final state of p1wins and p2wins are, we can add the score
      if (this.p1wins) {
        player1.score++;
      }
      if (this.p2wins) {
        player2.score++;
      }

      if (this.powerupSpawn) {
        if (this.powerupSpawn.onAction == this.p1Action) {
          this.playerPowerups[0] = this.createPowerup(
            this.powerupSpawn.powerup,
          );
        }

        if (this.powerupSpawn.onAction == this.p2Action) {
          this.playerPowerups[1] = this.createPowerup(
            this.powerupSpawn.powerup,
          );
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
    playDuel(tournament, io)(this);
  }

  createPowerup(powerup: RPSPowerup) {
    switch (powerup) {
      case "MOVEKILLER":
        return new MovekillerPowerup();
      case "SHIELD":
        return new ShieldPowerup();
      case "TIEBREAKER":
        return new TiebreakerPowerup();
      default:
        console.log(
          "Default Case Happened for Powerup, need to check if power ups are actually set up properly",
        );
        return new ShieldPowerup();
    }
  }

  canSpawnPowerup(){
    return this.powerupEnabled; // Add more conditions as required
  }

  spawnPowerup() {
    const actions = ["ROCK", "PAPER", "SCISSORS"];
    const powerUps = ["MOVEKILLER", "SHIELD", "TIEBREAKER"];
    const action = actions[Math.floor(Math.random() * actions.length)] as Action;
    const powerup = powerUps[Math.floor(Math.random() * powerUps.length)] as RPSPowerup;

    this.powerupSpawn = { powerup: powerup, onAction: action };
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
