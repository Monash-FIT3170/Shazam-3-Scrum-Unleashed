import { Server } from "socket.io";
import {
  PlayerAttributes,
  PongBallState,
  PongPaddleState,
} from "../../../types/types";
import { Match } from "./match";
import Player from "./player";
import { Events } from "../../../types/socket/events";

const INITIAL_BALL_Y_SPEED = 30;
const POLL_RATE = 30; // Hz

export class PongMatch implements Match {
  duelsToWin: number;
  matchRoomID: string;
  players: PlayerAttributes[];
  paddleStates: PongPaddleState[];
  ballState: PongBallState;
  intervalHandler: NodeJS.Timeout | null;
  score: number[];

  constructor(players: Player[], duelsToWin: number) {
    this.players = players;

    this.paddleStates = [
      { x: 50, y: 5, direction: 0, width: 20 },
      { x: 50, y: 95, direction: 0, width: 20 },
    ];
    this.matchRoomID = crypto.randomUUID();
    this.duelsToWin = duelsToWin;
    this.ballState = {
      x: 50,
      y: 50,
      xVelocity: this.randomXVelocity(),
      yVelocity: INITIAL_BALL_Y_SPEED,
    };
    this.intervalHandler = null;
    this.score = [0, 0];
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
    }, 1000 / POLL_RATE);
  }

  randomXVelocity(): number {
    return (Math.random() - 0.5) * 2 * INITIAL_BALL_Y_SPEED;
  }

  ballPaddleCollision(
    paddleX: number,
    paddleWidth: number,
    ballX: number,
  ): void {
    if (this.ballState.yVelocity < 0) {
      this.ballState.yVelocity -= 1;
    } else {
      this.ballState.yVelocity += 1;
    }
    this.ballState.yVelocity *= -1;

    const relativeIntersectX = paddleX + paddleWidth / 2 - ballX;
    const normalizedRelativeIntersectionY =
      relativeIntersectX / (paddleWidth / 2);
    const bounceAngle = (normalizedRelativeIntersectionY * 5 * Math.PI) / 12;

    this.ballState.xVelocity =
      Math.abs(this.ballState.yVelocity) * -Math.sin(bounceAngle);
  }

  tick(io: Server<Events>): void {
    // Calculating the new ball and paddle coordinates
    let newBallX = this.ballState.x + this.ballState.xVelocity / POLL_RATE;
    let newBallY = this.ballState.y + this.ballState.yVelocity / POLL_RATE;

    let paddle0 =
      this.paddleStates[0].x +
      (this.paddleStates[0].direction * 60) / POLL_RATE;

    let paddle1 =
      this.paddleStates[1].x +
      (this.paddleStates[1].direction * 60) / POLL_RATE;

    // ball collision with paddles
    let paddleCollision = false;
    if (newBallY <= this.paddleStates[0].y) {
      if (
        newBallX >= paddle0 &&
        newBallX <= paddle0 + this.paddleStates[0].width
      ) {
        this.ballPaddleCollision(paddle0, this.paddleStates[0].width, newBallX);
        newBallY = this.paddleStates[0].y;
        paddleCollision = true;
      }
    }

    if (newBallY >= this.paddleStates[1].y) {
      if (
        newBallX >= paddle1 &&
        newBallX <= paddle1 + this.paddleStates[1].width
      ) {
        this.ballPaddleCollision(paddle1, this.paddleStates[1].width, newBallX);
        newBallY = this.paddleStates[1].y;
        paddleCollision = true;
      }
    }

    // Preventing paddles from moving offscreen
    if (paddle0 + this.paddleStates[0].width >= 100) {
      paddle0 = 100 - this.paddleStates[0].width;
    } else if (paddle0 <= 0) {
      paddle0 = 0;
    }

    if (paddle1 + this.paddleStates[1].width >= 100) {
      paddle1 = 100 - this.paddleStates[1].width;
    } else if (paddle1 <= 0) {
      paddle1 = 0;
    }

    // Bounce ball off walls
    if (newBallX >= 100) {
      newBallX = 100;
      this.ballState.xVelocity = -this.ballState.xVelocity;
    } else if (newBallX <= 0) {
      newBallX = 0;
      this.ballState.xVelocity = -this.ballState.xVelocity;
    }

    // Score (can only happen when paddle did not collide)
    if (!paddleCollision) {
      if (newBallY >= 100) {
        newBallY = 50;
        newBallX = 50;
        this.ballState.yVelocity = INITIAL_BALL_Y_SPEED;
        this.ballState.xVelocity = this.randomXVelocity();
        this.score[1] += 1;
      }
      if (newBallY <= 0) {
        newBallY = 50;
        newBallX = 50;
        this.ballState.yVelocity = -INITIAL_BALL_Y_SPEED;
        this.ballState.xVelocity = this.randomXVelocity();
        this.score[0] += 1;
      }
    }

    // Update paddle positions
    this.paddleStates[0].x = paddle0;
    this.paddleStates[1].x = paddle1;

    // Update Ball
    this.ballState.x = newBallX;
    this.ballState.y = newBallY;

    io.to(this.matchRoomID).emit(
      "PONG_STATE",
      this.ballState,
      this.players,
      this.paddleStates,
      this.score,
      this.getMatchWinner()?.name ?? null,
    );
    console.log(this.ballState);
  }
}
