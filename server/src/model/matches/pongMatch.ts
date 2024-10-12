import { Server } from "socket.io";
import { PongBallState, PongPaddleState } from "../../../../types/types";
import { Match } from "./match";
import Player from "../player";
import { Events } from "../../../../types/socket/events";
import Tournament from "../tournament";
import { roundChecker } from "../../controllers/helper/roundHelper";
import { MatchType } from "../../../../types/socket/eventArguments";
import { BiggerPaddle } from "../powerups/pongPowerups/biggerPaddle";
import { ShrinkPaddle } from "../powerups/pongPowerups/shrinkPaddle";
import { PongPowerup } from "../powerups/pongPowerups/pongPowerup";
import { ReversedPaddleControls } from "../powerups/pongPowerups/reversedPaddleControls";

const INITIAL_BALL_Y_SPEED = 50;
const POLL_RATE = 60; // Hz
const BALL_RADIUS = 2;
const GAME_WIDTH = 75;
const GAME_HEIGHT = 100;
const PADDLE_WIDTH = 20;
const PADDLE_HITBOX_INCREASE = 0.1;
const POWERUP_SIZE = 5;

export interface PongPowerupSpawn {
  powerup: PongPowerup;
  x: number;
  y: number;
}

export class PongMatch implements Match {
  duelsToWin: number;
  matchRoomID: string;
  players: Player[];
  paddleStates: PongPaddleState[];
  ballState: PongBallState;
  tournament: Tournament;
  intervalHandler: NodeJS.Timeout | undefined;
  uncollectedPowerups: PongPowerupSpawn[];
  tickCounter: number;
  powerupsEnabled: boolean;

  constructor(players: Player[], duelsToWin: number, tournament: Tournament) {
    this.players = players;
    this.tournament = tournament;
    this.paddleStates = [
      {
        x: (GAME_WIDTH - PADDLE_WIDTH) / 2,
        y: 5,
        direction: 0,
        width: PADDLE_WIDTH,
        isReversedControl: false,
      },
      {
        x: (GAME_WIDTH - PADDLE_WIDTH) / 2,
        y: 95,
        direction: 0,
        width: PADDLE_WIDTH,
        isReversedControl: false,
      },
    ];
    this.matchRoomID = crypto.randomUUID();
    this.duelsToWin = duelsToWin;
    this.ballState = {
      x: GAME_WIDTH / 2,
      y: GAME_WIDTH / 2,
      xVelocity: 1,
      yVelocity: INITIAL_BALL_Y_SPEED,
    };
    this.intervalHandler = undefined;
    this.uncollectedPowerups = [];
    this.tickCounter = 0;
    this.powerupsEnabled = tournament.powerupsEnabled;
  }

  startMatch(io: Server<Events>): void {
    io.to(this.matchRoomID).emit(
      "MATCH_START",
      this.players,
      this.type(),
      this.tournament.duelTime / 1000,
      this.tournament.duelsToWin,
    );

    setTimeout(() => {
      this.emitMatchState(io);
      this.intervalHandler = setInterval(() => {
        this.tick(io);
      }, 1000 / POLL_RATE);
    }, 3200); // This will start the pong match after a short delay.
  }

  emitMatchState(io: Server<Events>): void {
    this.emitPaddleState(io);
    this.emitPongState(io);
  }

  emitPaddleState(io: Server<Events>): void {
    io.to(this.matchRoomID).emit("MATCH_PONG_PADDLE_STATE", this.paddleStates);
  }

  emitPongState(io: Server<Events>): void {
    io.to(this.matchRoomID).emit(
      "MATCH_PONG_BALL_STATE",
      this.ballState,
      this.uncollectedPowerups.map((uncollectedPowerup) => {
        return {
          x: uncollectedPowerup.x,
          y: uncollectedPowerup.y,
          name: uncollectedPowerup.powerup.name,
        };
      }),
    );
  }

  ballPaddleCollision(
    paddleX: number,
    paddleWidth: number,
    ballState: PongBallState,
  ): void {
    if (ballState.yVelocity < 0) {
      ballState.yVelocity -= 5;
    } else {
      ballState.yVelocity += 5;
    }
    ballState.yVelocity *= -1;

    const relativeIntersectX = paddleX + paddleWidth / 2 - ballState.x;
    const normalizedRelativeIntersectionY =
      relativeIntersectX / (paddleWidth / 2);
    const bounceAngle = (normalizedRelativeIntersectionY * 5 * Math.PI) / 12;

    ballState.xVelocity =
      Math.abs(ballState.yVelocity) * -Math.sin(bounceAngle);
  }

  tick(io: Server<Events>): void {
    this.tickCounter += 1;
    if (this.powerupsEnabled && this.tickCounter % (POLL_RATE * 5) == 0) {
      this.spawnPowerup();
    }

    // Calculating the new ball and paddle coordinates
    let newBallX = this.ballState.x + this.ballState.xVelocity / POLL_RATE;
    let newBallY = this.ballState.y + this.ballState.yVelocity / POLL_RATE;

    this.uncollectedPowerups = this.uncollectedPowerups.filter(
      (uncollectedPowerup) => {
        if (
          Math.abs(uncollectedPowerup.x - newBallX) < POWERUP_SIZE &&
          Math.abs(uncollectedPowerup.y - newBallY) < POWERUP_SIZE
        ) {
          uncollectedPowerup.powerup.activate(this);
          return false;
        }
        return true;
      },
    );

    const directionModifier0 = this.paddleStates[0].isReversedControl ? -1 : 1;

    let paddle0 =
      this.paddleStates[0].x +
      (this.paddleStates[0].direction *
        Math.abs(this.ballState.yVelocity) *
        directionModifier0) /
        POLL_RATE;

    console.log("Paddle 0 direction:", this.paddleStates[0].direction);
    console.log("Paddle 0 position:", paddle0);

    const directionModifier1 = this.paddleStates[1].isReversedControl ? -1 : 1;

    let paddle1 =
      this.paddleStates[1].x +
      (this.paddleStates[1].direction *
        Math.abs(this.ballState.yVelocity) *
        directionModifier1) /
        POLL_RATE;

    // ball collision with paddles
    let paddleCollision = false;
    if (newBallY - BALL_RADIUS <= this.paddleStates[0].y) {
      if (
        newBallX >= paddle0 * (1 - PADDLE_HITBOX_INCREASE) &&
        newBallX <=
          paddle0 * (1 + PADDLE_HITBOX_INCREASE) + this.paddleStates[0].width
      ) {
        this.ballPaddleCollision(
          paddle0,
          this.paddleStates[0].width,
          this.ballState,
        );
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
        this.ballPaddleCollision(
          paddle1,
          this.paddleStates[1].width,
          this.ballState,
        );
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
    let scored = false;
    if (!paddleCollision) {
      if (newBallY >= GAME_HEIGHT) {
        newBallY = GAME_HEIGHT / 2;
        newBallX = GAME_WIDTH / 2;
        this.resetBall(true, io);
        this.players[0].score += 1;
        winner = this.getMatchWinner();
        io.to(this.matchRoomID).emit(
          "MATCH_DATA",
          this.players,
          winner?.userID,
        );
        scored = true;
      }
      if (newBallY <= 0) {
        newBallY = GAME_HEIGHT / 2;
        newBallX = GAME_WIDTH / 2;
        this.resetBall(false, io);
        this.players[1].score += 1;
        winner = this.getMatchWinner();
        io.to(this.matchRoomID).emit(
          "MATCH_DATA",
          this.players,
          winner?.userID,
        );
        scored = true;
      }
    }

    // Update paddle positions
    this.paddleStates[0].x = paddle0;
    this.paddleStates[1].x = paddle1;

    // Update Ball
    this.ballState.x = newBallX;
    this.ballState.y = newBallY;

    io.to(this.matchRoomID).emit("MATCH_PONG_PADDLE_STATE", this.paddleStates);

    if (scored || this.tickCounter % (POLL_RATE / 2) === 0) {
      this.emitPongState(io);
    }

    if (winner != null) {
      roundChecker(this.tournament, io);
      clearInterval(this.intervalHandler);
    }
  }

  resetBall(moveUp: boolean, io: Server) {
    this.ballState.yVelocity = 0;
    this.ballState.xVelocity = 0;

    setTimeout(() => {
      this.ballState.yVelocity = moveUp
        ? -INITIAL_BALL_Y_SPEED
        : INITIAL_BALL_Y_SPEED;
      this.ballState.xVelocity = 1;
      this.emitPongState(io);
    }, 4600);
  }

  private spawnPowerup() {
    this.uncollectedPowerups.push({
      powerup: new ReversedPaddleControls(),
      x: Math.random() * GAME_WIDTH,
      y: Math.random() * GAME_HEIGHT,
    });

    this.uncollectedPowerups.push({
      powerup: new BiggerPaddle(),
      x: Math.random() * GAME_WIDTH,
      y: Math.random() * GAME_HEIGHT,
    });

    // we add shrinkpaddle powerup to the list:
    this.uncollectedPowerups.push({
      powerup: new ShrinkPaddle(),
      x: Math.random() * GAME_WIDTH,
      y: Math.random() * GAME_HEIGHT,
    });
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
