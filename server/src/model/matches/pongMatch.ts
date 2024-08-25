import { Server } from "socket.io";
import { PongBallState, PongPaddleState } from "../../../../types/types";
import { Match } from "./match";
import Player from "../player";
import { Events } from "../../../../types/socket/events";
import Tournament from "../tournament";
import { roundChecker } from "../../controllers/helper/roundHelper";
import { MatchType } from "../../../../types/socket/eventArguments";
import * as crypto from "node:crypto";

const INITIAL_BALL_Y_SPEED = 50;
const POLL_RATE = 3; // Hz
const BALL_RADIUS = 2;
const GAME_WIDTH = 75;
const GAME_HEIGHT = 100;
const PADDLE_WIDTH = 20;
const PADDLE_HITBOX_INCREASE = 0.1;

export class PongMatch implements Match {
  duelsToWin: number;
  matchRoomID: string;
  players: Player[];
  paddleStates: PongPaddleState[];
  ballState: PongBallState;
  tournament: Tournament;
  intervalHandler: NodeJS.Timeout | undefined;

  constructor(players: Player[], duelsToWin: number, tournament: Tournament) {
    this.players = players;
    this.tournament = tournament;
    this.paddleStates = [
      {
        x: (GAME_WIDTH - PADDLE_WIDTH) / 2,
        y: 5,
        direction: 0,
        width: PADDLE_WIDTH,
      },
      {
        x: (GAME_WIDTH - PADDLE_WIDTH) / 2,
        y: 95,
        direction: 0,
        width: PADDLE_WIDTH,
      },
    ];
    this.matchRoomID = crypto.randomUUID();
    this.duelsToWin = duelsToWin;
    this.ballState = {
      x: GAME_WIDTH / 2,
      y: GAME_WIDTH / 2,
      xVelocity: this.randomXVelocity(),
      yVelocity: INITIAL_BALL_Y_SPEED,
    };
    this.intervalHandler = undefined;
  }

  startMatch(io: Server<Events>): void {
    io.to(this.matchRoomID).emit(
      "MATCH_START",
      this.players,
      "PONG",
      this.tournament.duelTime / 1000,
    );

    setTimeout(() => {
      this.emitMatchState(io);
      this.intervalHandler = setInterval(() => {
        this.tick(io);
      }, 1000 / POLL_RATE);
    }, 1000); // this will start the pong match after a short delay, maybe not required.
  }

  emitMatchState(io: Server<Events>): void {
    io.to(this.matchRoomID).emit(
      "MATCH_PONG_STATE",
      this.ballState,
      this.paddleStates,
    );
  }

  randomXVelocity(): number {
    return (Math.random() - 0.5) * INITIAL_BALL_Y_SPEED;
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
    // Calculating the new ball and paddle coordinates
    let newBallX = this.ballState.x + this.ballState.xVelocity / POLL_RATE;
    let newBallY = this.ballState.y + this.ballState.yVelocity / POLL_RATE;

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
        newBallX >= paddle0 * (1 - PADDLE_HITBOX_INCREASE) &&
        newBallX <=
          paddle0 * (1 + PADDLE_HITBOX_INCREASE) + this.paddleStates[0].width
      ) {
        this.ballPaddleCollision(paddle0, this.paddleStates[0].width, newBallX);
        newBallY = this.paddleStates[0].y + BALL_RADIUS;
        paddleCollision = true;
      }
    }

    if (newBallY + BALL_RADIUS >= this.paddleStates[1].y) {
      if (
        newBallX >= paddle1 * (1 - PADDLE_HITBOX_INCREASE) &&
        newBallX <=
          paddle1 * (1 + PADDLE_HITBOX_INCREASE) + this.paddleStates[1].width
      ) {
        this.ballPaddleCollision(paddle1, this.paddleStates[1].width, newBallX);
        newBallY = this.paddleStates[1].y - BALL_RADIUS;
        paddleCollision = true;
      }
    }

    // Preventing paddles from moving offscreen
    if (paddle0 + this.paddleStates[0].width >= GAME_WIDTH) {
      paddle0 = GAME_WIDTH - this.paddleStates[0].width;
    } else if (paddle0 <= 0) {
      paddle0 = 0;
    }

    if (paddle1 + this.paddleStates[1].width >= GAME_WIDTH) {
      paddle1 = GAME_WIDTH - this.paddleStates[1].width;
    } else if (paddle1 <= 0) {
      paddle1 = 0;
    }

    // Bounce ball off walls
    if (newBallX + BALL_RADIUS >= GAME_WIDTH) {
      newBallX = GAME_WIDTH - 2 * BALL_RADIUS - (newBallX - GAME_WIDTH);
      this.ballState.xVelocity = -this.ballState.xVelocity;
    } else if (newBallX - BALL_RADIUS <= 0) {
      newBallX = 2 * BALL_RADIUS - newBallX;
      this.ballState.xVelocity = -this.ballState.xVelocity;
    }

    // Score (can only happen when paddle did not collide)
    let winner = null;
    if (!paddleCollision) {
      if (newBallY >= GAME_HEIGHT) {
        newBallY = GAME_HEIGHT / 2;
        newBallX = GAME_WIDTH / 2;
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
        newBallY = GAME_HEIGHT / 2;
        newBallX = GAME_WIDTH / 2;
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

    this.emitMatchState(io);

    if (winner != null) {
      roundChecker(this.tournament, io);
      clearInterval(this.intervalHandler);
    }
  }

  type(): MatchType {
    return "PONG";
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

  clearTimeouts(): void {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
    }
  }
}
