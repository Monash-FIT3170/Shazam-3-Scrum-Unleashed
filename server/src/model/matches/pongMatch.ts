import { Server } from "socket.io";
import { PongBallState, PongPaddleState } from "../../../../types/types";
import { Match } from "./match";
import Player from "../player";
import { Events } from "../../../../types/socket/events";
import Tournament from "../tournament";
import { roundChecker } from "../../controllers/helper/roundHelper";

const INITIAL_BALL_Y_SPEED = 50;
const POLL_RATE = 10; // Hz

export class PongMatch extends Match {
  paddleStates: PongPaddleState[];
  ballState: PongBallState;
  tournament: Tournament;
  intervalHandler: NodeJS.Timeout | undefined;

  constructor(players: Player[], duelsToWin: number, tournament: Tournament) {
    super(players, duelsToWin);
    this.tournament = tournament;
    this.paddleStates = [
      { x: 50, y: 5, direction: 0, width: 20 },
      { x: 50, y: 95, direction: 0, width: 20 },
    ];
    this.ballState = {
      x: 50,
      y: 50,
      xVelocity: this.randomXVelocity(),
      yVelocity: INITIAL_BALL_Y_SPEED,
    };
    this.intervalHandler = undefined;
  }

  override startMatch(io: Server<Events>): void {
    io.to(this.matchRoomID).emit("MATCH_START", this.players, "PONG");

    setTimeout(() => {
      this.intervalHandler = setInterval(() => {
        this.tick(io);
      }, 1000 / POLL_RATE);
    }, 1000); // this will start the pong match after a short delay, maybe not required.
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
      this.ballState.yVelocity -= 5;
    } else {
      this.ballState.yVelocity += 5;
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
    const BALL_RADIUS = 2;
    let emitData = false;

    // Calculating the new ball and paddle coordinates
    let newBallX = this.ballState.x + this.ballState.xVelocity / POLL_RATE;
    let newBallY = this.ballState.y + this.ballState.yVelocity / POLL_RATE;

    if (this.paddleStates[0].direction || this.paddleStates[1].direction) {
      emitData = true;
    }

    let paddle0 =
      this.paddleStates[0].x +
      (this.paddleStates[0].direction * Math.abs(this.ballState.yVelocity)) /
        POLL_RATE;

    let paddle1 =
      this.paddleStates[1].x +
      (this.paddleStates[1].direction * Math.abs(this.ballState.yVelocity)) /
        POLL_RATE;

    // ball collision with paddles
    let paddleCollision = false;
    if (newBallY - BALL_RADIUS <= this.paddleStates[0].y) {
      if (
        newBallX >= paddle0 &&
        newBallX <= paddle0 + this.paddleStates[0].width
      ) {
        this.ballPaddleCollision(paddle0, this.paddleStates[0].width, newBallX);
        newBallY = this.paddleStates[0].y + BALL_RADIUS;
        paddleCollision = true;
        emitData = true;
      }
    }

    if (newBallY + BALL_RADIUS >= this.paddleStates[1].y) {
      if (
        newBallX >= paddle1 &&
        newBallX <= paddle1 + this.paddleStates[1].width
      ) {
        this.ballPaddleCollision(paddle1, this.paddleStates[1].width, newBallX);
        newBallY = this.paddleStates[1].y - BALL_RADIUS;
        paddleCollision = true;
        emitData = true;
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
    if (newBallX + BALL_RADIUS >= 100) {
      newBallX = 100 - BALL_RADIUS;
      this.ballState.xVelocity = -this.ballState.xVelocity;
      emitData = true;
    } else if (newBallX - BALL_RADIUS <= 0) {
      newBallX = BALL_RADIUS;
      this.ballState.xVelocity = -this.ballState.xVelocity;
      emitData = true;
    }

    // Score (can only happen when paddle did not collide)
    let winner = null;
    if (!paddleCollision) {
      if (newBallY >= 100) {
        newBallY = 50;
        newBallX = 50;
        this.ballState.yVelocity = INITIAL_BALL_Y_SPEED;
        this.ballState.xVelocity = this.randomXVelocity();
        this.players[0].score += 1;
        winner = this.getMatchWinner();
        io.to(this.matchRoomID).emit(
          "MATCH_DATA",
          this.players,
          winner?.userID,
        );
      }
      if (newBallY <= 0) {
        newBallY = 50;
        newBallX = 50;
        this.ballState.yVelocity = -INITIAL_BALL_Y_SPEED;
        this.ballState.xVelocity = this.randomXVelocity();
        this.players[1].score += 1;
        winner = this.getMatchWinner();
        io.to(this.matchRoomID).emit(
          "MATCH_DATA",
          this.players,
          winner?.userID,
        );
      }
    }

    // Update paddle positions
    this.paddleStates[0].x = paddle0;
    this.paddleStates[1].x = paddle1;

    // Update Ball
    this.ballState.x = newBallX;
    this.ballState.y = newBallY;

    if (emitData) {
      io.to(this.matchRoomID).emit(
        "MATCH_PONG_STATE",
        this.ballState,
        this.paddleStates,
      );
    }

    if (winner != null) {
      roundChecker(this.tournament, io, this);
      clearInterval(this.intervalHandler);
    }
  }
}
