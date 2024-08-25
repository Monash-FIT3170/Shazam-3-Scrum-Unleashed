import React, { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "../../App";
import { PongBallState, PongPaddleState } from "../../../../types/types";
import { PongButton } from "./PongButton";
import LeftButton from "../../assets/pong-buttons/LEFT.svg";
import LeftButtonDown from "../../assets/pong-buttons/LEFT-BUTTON-DOWN.svg";
import RightButton from "../../assets/pong-buttons/RIGHT.svg";
import RightButtonDown from "../../assets/pong-buttons/RIGHT-BUTTON-DOWN.svg";
import PropTypes from "prop-types";

const GAME_WIDTH = 375;
const GAME_HEIGHT = 500;
const BALL_RADIUS = 2;
const PADDLE_HEIGHT = GAME_HEIGHT * 0.02;
const SCALING_FACTOR = GAME_HEIGHT / 100;
const STROKE_WIDTH = 2;

type PongProps = {
  tournamentCode: string;
  isPlayerOne: boolean;
};

type ButtonState = "left" | "right" | null;

const clampX = (ballState: PongBallState, gameWidth: number) => {
  const scaledRadius = BALL_RADIUS * SCALING_FACTOR;
  if (ballState.x < scaledRadius) {
    ballState.x = 2 * scaledRadius - ballState.x;
    ballState.xVelocity *= -1;
  } else if (ballState.x > gameWidth - scaledRadius) {
    ballState.x = gameWidth - 2 * scaledRadius - (ballState.x - gameWidth);
    ballState.xVelocity *= -1;
  }
};

const clampY = (
  number: number,
  paddlePosition: PongPaddleState | undefined,
  ballState: PongBallState,
) => {
  if (!paddlePosition) return number;

  const scaledRadius = BALL_RADIUS * SCALING_FACTOR;
  const halfHeight = 50 * SCALING_FACTOR;

  if (
    number < paddlePosition.y + scaledRadius &&
    ballState.y < halfHeight &&
    ballState.x > paddlePosition.x &&
    ballState.x < paddlePosition.x + paddlePosition.width
  ) {
    return paddlePosition.y + scaledRadius;
  } else if (
    number > paddlePosition.y - scaledRadius &&
    ballState.y > halfHeight &&
    ballState.x > paddlePosition.x &&
    ballState.x < paddlePosition.x + paddlePosition.width
  ) {
    return paddlePosition.y - scaledRadius;
  }

  return number;
};

const Pong: React.FC<PongProps> = React.memo(
  ({ tournamentCode, isPlayerOne }) => {
    const [buttonState, setButtonState] = useState<ButtonState>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameState = useRef({
      ball: {
        x: GAME_WIDTH / 2,
        y: GAME_HEIGHT / 2,
        xVelocity: 0,
        yVelocity: 0,
      },
      paddle1: undefined as PongPaddleState | undefined,
      paddle2: undefined as PongPaddleState | undefined,
      lastUpdateTime: performance.now(),
    });

    const updateGameState = useCallback(
      (ballState: PongBallState, paddleStates: PongPaddleState[]) => {
        gameState.current = {
          ball: {
            x: ballState.x * SCALING_FACTOR,
            y: ballState.y * SCALING_FACTOR,
            xVelocity: ballState.xVelocity * SCALING_FACTOR,
            yVelocity: ballState.yVelocity * SCALING_FACTOR,
          },
          paddle1: {
            ...paddleStates[0],
            width: paddleStates[0].width * SCALING_FACTOR,
            x: paddleStates[0].x * SCALING_FACTOR,
            y: paddleStates[0].y * SCALING_FACTOR,
          },
          paddle2: {
            ...paddleStates[1],
            width: paddleStates[1].width * SCALING_FACTOR,
            x: paddleStates[1].x * SCALING_FACTOR,
            y: paddleStates[1].y * SCALING_FACTOR,
          },
          lastUpdateTime: performance.now(),
        };
      },
      [],
    );

    const drawGame = useCallback(
      (ctx: CanvasRenderingContext2D) => {
        const { ball, paddle1, paddle2 } = gameState.current;

        if (isPlayerOne) {
          ctx.save();
          ctx.scale(1, -1);
          ctx.translate(0, -GAME_HEIGHT);
        }

        // Background
        ctx.fillStyle = "#22026c";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Center line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, GAME_HEIGHT / 2);
        ctx.lineTo(GAME_WIDTH, GAME_HEIGHT / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Ball
        clampX(ball, GAME_WIDTH);
        const closestPaddle = ball.y > 50 * SCALING_FACTOR ? paddle2 : paddle1;
        const yClamped = clampY(ball.y, closestPaddle, ball);

        const adjustedRadius = BALL_RADIUS * SCALING_FACTOR - STROKE_WIDTH;
        ctx.fillStyle = "#ff00ff";
        ctx.beginPath();
        ctx.arc(ball.x, yClamped, adjustedRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = STROKE_WIDTH;
        ctx.stroke();

        // Paddles
        const drawPaddle = (
          paddle: PongPaddleState,
          color: string,
          isTop = false,
        ) => {
          const { x, y, width } = paddle;
          const adjustedX = x + STROKE_WIDTH / 2;
          const adjustedY = y + STROKE_WIDTH / 2;
          const adjustedWidth = width - STROKE_WIDTH;
          const adjustedHeight = PADDLE_HEIGHT - STROKE_WIDTH;
          const topOffset = isTop ? -PADDLE_HEIGHT : 0;

          ctx.fillStyle = color;
          ctx.fillRect(x, y + topOffset, width, PADDLE_HEIGHT);
          ctx.strokeStyle = "white";
          ctx.lineWidth = STROKE_WIDTH;
          ctx.strokeRect(
            adjustedX,
            adjustedY + topOffset,
            adjustedWidth,
            adjustedHeight,
          );
        };

        if (paddle1) drawPaddle(paddle1, "#ff4757", true);
        if (paddle2) drawPaddle(paddle2, "#2ed573");

        if (isPlayerOne) {
          ctx.restore();
        }
      },
      [isPlayerOne],
    );

    const animateGame = useCallback(() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      const now = performance.now();
      const deltaTime = (now - gameState.current.lastUpdateTime) / 1000;
      gameState.current.lastUpdateTime = now;

      gameState.current.ball.x += gameState.current.ball.xVelocity * deltaTime;
      gameState.current.ball.y += gameState.current.ball.yVelocity * deltaTime;

      drawGame(ctx);
      requestAnimationFrame(animateGame);
    }, [drawGame]);

    const handlePaddleMove = useCallback(
      (isMoving: boolean, direction: "left" | "right") => {
        socket.emit(
          "PONG_PADDLE_MOVEMENT",
          tournamentCode,
          socket.userID,
          isMoving,
          direction === "left",
        );
        setButtonState(isMoving ? direction : null);
      },
      [tournamentCode],
    );

    useEffect(() => {
      socket.on("MATCH_PONG_STATE", updateGameState);
      const keyHandler = (event: KeyboardEvent, isKeyDown: boolean) => {
        if (event.key === "ArrowLeft") handlePaddleMove(isKeyDown, "left");
        if (event.key === "ArrowRight") handlePaddleMove(isKeyDown, "right");
      };

      document.addEventListener("keydown", (e) => keyHandler(e, true));
      document.addEventListener("keyup", (e) => keyHandler(e, false));
      requestAnimationFrame(animateGame);

      return () => {
        socket.off("MATCH_PONG_STATE", updateGameState);
        document.removeEventListener("keydown", (e) => keyHandler(e, true));
        document.removeEventListener("keyup", (e) => keyHandler(e, false));
      };
    }, [updateGameState, handlePaddleMove, animateGame]);

    const buttonProps = {
      left: {
        onMouseDown: () => handlePaddleMove(true, "left"),
        onMouseUp: () => handlePaddleMove(false, "left"),
        onTouchStart: () => handlePaddleMove(true, "left"),
        onTouchEnd: () => handlePaddleMove(false, "left"),
        src: buttonState === "left" ? LeftButtonDown : LeftButton,
      },
      right: {
        onMouseDown: () => handlePaddleMove(true, "right"),
        onMouseUp: () => handlePaddleMove(false, "right"),
        onTouchStart: () => handlePaddleMove(true, "right"),
        onTouchEnd: () => handlePaddleMove(false, "right"),
        src: buttonState === "right" ? RightButtonDown : RightButton,
      },
    };

    return (
      <>
        <div className="bg-white p-1">
          <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} />
        </div>
        <div className="flex flex-row gap-3">
          <PongButton {...buttonProps.left} />
          <PongButton {...buttonProps.right} />
        </div>
      </>
    );
  },
);
Pong.propTypes = {
  tournamentCode: PropTypes.string.isRequired,
  isPlayerOne: PropTypes.bool.isRequired,
};
Pong.displayName = "Pong";
export { Pong };
