import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { socket } from "../../App";
import { PongBallState, PongPaddleState } from "../../../../types/types.ts";
import { PongButton } from "./PongButton.tsx";
import LeftButton from "../../assets/pong-buttons/LEFT.svg";
import LeftButtonDown from "../../assets/pong-buttons/LEFT-BUTTON-DOWN.svg";
import RightButton from "../../assets/pong-buttons/RIGHT.svg";
import RightButtonDown from "../../assets/pong-buttons/RIGHT-BUTTON-DOWN.svg";

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
    const ballState = useRef<PongBallState>({
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      xVelocity: 0,
      yVelocity: 0,
    });
    const paddle1Position = useRef<PongPaddleState>();
    const paddle2Position = useRef<PongPaddleState>();
    const lastUpdateTime = useRef(performance.now());
    const animationFrameId = useRef<number>();

    const updateServerBallPosition = useCallback(
      (
        serverBallState: PongBallState,
        serverPaddleStates: PongPaddleState[],
      ) => {
        ballState.current = {
          x: serverBallState.x * SCALING_FACTOR,
          y: serverBallState.y * SCALING_FACTOR,
          xVelocity: serverBallState.xVelocity * SCALING_FACTOR,
          yVelocity: serverBallState.yVelocity * SCALING_FACTOR,
        };
        paddle1Position.current = {
          ...serverPaddleStates[0],
          width: serverPaddleStates[0].width * SCALING_FACTOR,
          x: serverPaddleStates[0].x * SCALING_FACTOR,
          y: serverPaddleStates[0].y * SCALING_FACTOR,
        };
        paddle2Position.current = {
          ...serverPaddleStates[1],
          width: serverPaddleStates[1].width * SCALING_FACTOR,
          x: serverPaddleStates[1].x * SCALING_FACTOR,
          y: serverPaddleStates[1].y * SCALING_FACTOR,
        };
        lastUpdateTime.current = performance.now();
      },
      [],
    );

    const drawGame = useCallback(
      (ctx: CanvasRenderingContext2D) => {
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
        clampX(ballState.current, GAME_WIDTH);
        const closestPaddle =
          ballState.current.y > 50 * SCALING_FACTOR
            ? paddle2Position
            : paddle1Position;
        const yClamped = clampY(
          ballState.current.y,
          closestPaddle.current,
          ballState.current,
        );

        const adjustedRadius = BALL_RADIUS * SCALING_FACTOR - STROKE_WIDTH;

        ctx.fillStyle = "#ff00ff";
        ctx.beginPath();
        ctx.arc(ballState.current.x, yClamped, adjustedRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = STROKE_WIDTH;
        ctx.stroke();

        // Paddles
        const drawPaddle = (
          x: number,
          y: number,
          width: number,
          height: number,
          color: string,
          isTop = false,
        ) => {
          const adjustedX = x + STROKE_WIDTH / 2;
          const adjustedY = y + STROKE_WIDTH / 2;
          const adjustedWidth = width - STROKE_WIDTH;
          const adjustedHeight = height - STROKE_WIDTH;
          const topOffset = isTop ? -PADDLE_HEIGHT : 0;

          ctx.fillStyle = color;
          ctx.fillRect(x, y + topOffset, width, height);
          ctx.strokeStyle = "white";
          ctx.lineWidth = STROKE_WIDTH;
          ctx.strokeRect(
            adjustedX,
            adjustedY + topOffset,
            adjustedWidth,
            adjustedHeight,
          );
        };

        if (paddle1Position.current) {
          drawPaddle(
            paddle1Position.current.x,
            paddle1Position.current.y,
            paddle1Position.current.width,
            PADDLE_HEIGHT,
            "#ff4757",
            true,
          );
        }

        if (paddle2Position.current) {
          drawPaddle(
            paddle2Position.current.x,
            paddle2Position.current.y,
            paddle2Position.current.width,
            PADDLE_HEIGHT,
            "#2ed573",
          );
        }

        if (isPlayerOne) {
          ctx.restore();
        }
      },
      [isPlayerOne],
    );

    const drawFrame = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      const now = performance.now();
      const deltaTime = (now - lastUpdateTime.current) / 1000;
      lastUpdateTime.current = now;

      ballState.current = {
        ...ballState.current,
        x: ballState.current.x + ballState.current.xVelocity * deltaTime,
        y: ballState.current.y + ballState.current.yVelocity * deltaTime,
      };

      drawGame(ctx);
      animationFrameId.current = requestAnimationFrame(drawFrame);
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

    const handleButtonDown = useCallback(
      (direction: "left" | "right") => {
        handlePaddleMove(true, direction);
      },
      [handlePaddleMove],
    );

    const handleButtonUp = useCallback(() => {
      handlePaddleMove(false, buttonState as "left" | "right");
    }, [handlePaddleMove, buttonState]);

    useEffect(() => {
      socket.on("MATCH_PONG_STATE", updateServerBallPosition);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") handlePaddleMove(true, "left");
        if (event.key === "ArrowRight") handlePaddleMove(true, "right");
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          handlePaddleMove(false, buttonState as "left" | "right");
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

      return () => {
        socket.off("MATCH_PONG_STATE", updateServerBallPosition);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, [updateServerBallPosition, handlePaddleMove, buttonState]);

    useEffect(() => {
      animationFrameId.current = requestAnimationFrame(drawFrame);
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }, [drawFrame]);

    const buttonProps = useMemo(
      () => ({
        left: {
          onMouseDown: () => handleButtonDown("left"),
          onMouseUp: handleButtonUp,
          onTouchStart: () => handleButtonDown("left"),
          onTouchEnd: handleButtonUp,
          src: buttonState === "left" ? LeftButtonDown : LeftButton,
        },
        right: {
          onMouseDown: () => handleButtonDown("right"),
          onMouseUp: handleButtonUp,
          onTouchStart: () => handleButtonDown("right"),
          onTouchEnd: handleButtonUp,
          src: buttonState === "right" ? RightButtonDown : RightButton,
        },
      }),
      [buttonState, handleButtonDown, handleButtonUp],
    );

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

export { Pong };
