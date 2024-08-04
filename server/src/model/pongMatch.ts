import { Server } from "socket.io";
import {
  PlayerAttributes,
  PongBallPosition,
  PongPaddleState,
} from "../../../types/types";
import { Match } from "./match";
import Player from "./player";
import { Events } from "../../../types/socket/events";

export class PongMatch implements Match {
  duelsToWin: number;
  matchRoomID: string;
  players: PlayerAttributes[];
  paddlePositions: PongPaddleState[];
  ballPosition: PongBallPosition;
  pollRate: number; // Hz
  intervalHandler: NodeJS.Timeout | null;

  constructor(players: Player[], duelsToWin: number) {
    this.players = players;
    this.paddlePositions = [
      { x: 50, direction: 0 },
      { x: 50, direction: 0 },
    ];
    this.matchRoomID = crypto.randomUUID();
    this.duelsToWin = duelsToWin;
    this.ballPosition = {
      x: 0,
      y: 0,
      xVelocity: 100,
      yVelocity: 100,
    };
    this.pollRate = 240;
    this.intervalHandler = null;
  }

  isDuelComplete(): boolean {
    return false;
  }

  getMatchWinner(): Player | null {
    return null;
  }

  emitGameData(io: Server<Events>): void {
    this.intervalHandler = setInterval(() => this.tick(io), 1000/this.pollRate);
  }

  tick(io: Server<Events>): void {
    // Check if ball collisions
    // - Score Zone
    // - Player
    // - Wall

    // Update paddle positions


    // Update Ball
    this.ballPosition = {
      ...this.ballPosition,
      x: this.ballPosition.x + this.ballPosition.xVelocity / this.pollRate,
      y: this.ballPosition.y + this.ballPosition.yVelocity / this.pollRate,
    };

    io.to(this.matchRoomID).emit(
      "PONG_STATE",
      this.ballPosition,
      this.players,
      this.paddlePositions,
      this.isDuelComplete(),
      this.getMatchWinner()?.name ?? null,
    );
  }
}
