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
      { x: 50, y: 3, direction: 0, width: 15 },
      { x: 50, y: 97, direction: 0, width: 15 },
    ];
    this.matchRoomID = crypto.randomUUID();
    this.duelsToWin = duelsToWin;
    this.ballPosition = {
      x: 50,
      y: 50,
      xVelocity: 30,
      yVelocity: 30,
    };
    this.pollRate = 15;
    this.intervalHandler = null;
  }

  isDuelComplete(): boolean {
    return false;
  }

  getMatchWinner(): Player | null {
    return null;
  }

  emitGameData(io: Server<Events>): void {
    this.intervalHandler = setInterval(() => {
      this.tick(io);
    }, 1000 / this.pollRate);
  }

  tick(io: Server<Events>): void {
    // Calculating the new ball and paddle coordinates
    let newBallX =
      this.ballPosition.x + this.ballPosition.xVelocity / this.pollRate;
    let newBallY =
      this.ballPosition.y + this.ballPosition.yVelocity / this.pollRate;

    let paddle0 =
      this.paddlePositions[0].x +
      (this.paddlePositions[0].direction * 60) / this.pollRate;

    let paddle1 =
      this.paddlePositions[1].x +
      (this.paddlePositions[1].direction * 60) / this.pollRate;

    // ball collision with paddles
    if (newBallY <= this.paddlePositions[0].y) {
      if (
        newBallX >= paddle0 &&
        newBallX <= paddle0 + this.paddlePositions[0].width
      ) {
        this.ballPosition.yVelocity = -this.ballPosition.yVelocity;
        newBallY = this.paddlePositions[0].y;
      }
    }

    if (newBallY >= this.paddlePositions[1].y) {
      if (
        newBallX >= paddle1 &&
        newBallX <= paddle1 + this.paddlePositions[1].width
      ) {
        this.ballPosition.yVelocity = -this.ballPosition.yVelocity;
        newBallY = this.paddlePositions[1].y;
      }
    }

    // preventing paddle from moving offscreen
    if (paddle0 + this.paddlePositions[0].width >= 100) {
      paddle0 = 100 - this.paddlePositions[0].width;
    } else if (paddle0 <= 0) {
      paddle0 = 0;
    }

    if (paddle1 + this.paddlePositions[1].width >= 100) {
      paddle1 = 100 - this.paddlePositions[1].width;
    } else if (paddle1 <= 0) {
      paddle1 = 0;
    }

    if (newBallX >= 100) {
      newBallX = 100;
      this.ballPosition.xVelocity = -this.ballPosition.xVelocity;
    } else if (newBallX <= 0) {
      newBallX = 0;
      this.ballPosition.xVelocity = -this.ballPosition.xVelocity;
    }

    // Score
    if (newBallY >= 100) {
      newBallY = 100;
      this.ballPosition.yVelocity = -this.ballPosition.yVelocity;
    }
    if (newBallY <= 0) {
      newBallY = 0;
      this.ballPosition.yVelocity = -this.ballPosition.yVelocity;
    }

    // Update paddle positions
    this.paddlePositions[0].x = paddle0;
    this.paddlePositions[1].x = paddle1;

    // Update Ball
    this.ballPosition.x = newBallX;
    this.ballPosition.y = newBallY;

    io.to(this.matchRoomID).emit(
      "PONG_STATE",
      this.ballPosition,
      this.players,
      this.paddlePositions,
      this.isDuelComplete(),
      this.getMatchWinner()?.name ?? null,
    );
    console.log(this.ballPosition);
  }
}
