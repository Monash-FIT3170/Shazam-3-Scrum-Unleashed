import { useEffect, useRef } from "react";
import { socket } from "../../App";
import { PongBallState, PongPaddleState } from "../../../../types/types.ts";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const BALL_RADIUS = 2;
const PADDLE_HEIGHT = GAME_HEIGHT * 0.02;
const SCALING_FACTOR = GAME_WIDTH / 100;

type PongProps = {
  tournamentCode: string;
  isPlayerOne: boolean;
};

const clampX = (number: number, gameWidth: number) =>
  Math.min(
    Math.max(number, 0 + BALL_RADIUS * SCALING_FACTOR),
    gameWidth - BALL_RADIUS * SCALING_FACTOR
  );

const clampY = (
  number: number,
  paddlePosition: PongPaddleState | undefined,
  ballState: PongBallState
) => {

  if (!paddlePosition) {
    return number;
  }

  console.log(paddlePosition.y);
  console.log(number);

  if (
    number < paddlePosition.y + BALL_RADIUS * SCALING_FACTOR &&
    ballState.y < 50 * SCALING_FACTOR
  ) {
    return paddlePosition.y + BALL_RADIUS * SCALING_FACTOR;
  } else if (
    number > paddlePosition.y - BALL_RADIUS * SCALING_FACTOR &&
    ballState.y > 50 * SCALING_FACTOR
  ) {
    return paddlePosition.y - BALL_RADIUS * SCALING_FACTOR;
  }

  // if (
  //   ballState.x + BALL_RADIUS * SCALING_FACTOR >
  //     paddlePosition.x - paddlePosition.width / 2 &&
  //   ballState.x - BALL_RADIUS * SCALING_FACTOR <
  //     paddlePosition.x + paddlePosition.width / 2
  // ) {
  //   return number > 50 * SCALING_FACTOR
  //     ? paddlePosition.y - BALL_RADIUS * SCALING_FACTOR
  //     : paddlePosition.y + BALL_RADIUS * SCALING_FACTOR;
  // }

  return number;
};

const Pong = ({ tournamentCode, isPlayerOne }: PongProps) => {
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

  const updateServerBallPosition = (
    serverBallState: PongBallState,
    serverPaddleStates: PongPaddleState[]
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
  };

  const drawGame = (ctx: CanvasRenderingContext2D) => {
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
    const xClamped = clampX(ballState.current.x, GAME_WIDTH);
    const closestPaddle =
      ballState.current.y > 50 * SCALING_FACTOR
        ? paddle2Position
        : paddle1Position;
    const yClamped = clampY(
      ballState.current.y,
      closestPaddle.current,
      ballState.current
    );

    const strokeWidth = 2;
    const adjustedRadius = BALL_RADIUS * SCALING_FACTOR - strokeWidth;

    ctx.fillStyle = "#ff00ff";
    ctx.beginPath();
    ctx.arc(xClamped, yClamped, adjustedRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = strokeWidth;
    ctx.stroke();

    // Paddles
    const drawPaddle = (
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
      isTop = false
    ) => {
      const strokeWidth = 2;
      const adjustedX = x + strokeWidth / 2;
      const adjustedY = y + strokeWidth / 2;
      const adjustedWidth = width - strokeWidth;
      const adjustedHeight = height - strokeWidth;
      const topOffset = isTop ? -PADDLE_HEIGHT : 0;

      ctx.fillStyle = color;
      ctx.fillRect(x, y + topOffset, width, height);
      ctx.strokeStyle = "white";
      ctx.lineWidth = strokeWidth;
      ctx.strokeRect(
        adjustedX,
        adjustedY + topOffset,
        adjustedWidth,
        adjustedHeight
      );
    };

    // TODO - Have paddles drawn in middle at the start by default
    if (paddle1Position.current) {
      drawPaddle(
        paddle1Position.current.x,
        paddle1Position.current.y,
        paddle1Position.current.width,
        PADDLE_HEIGHT,
        "#ff4757",
        true
      );
    }

    if (paddle2Position.current) {
      drawPaddle(
        paddle2Position.current.x,
        paddle2Position.current.y,
        paddle2Position.current.width,
        PADDLE_HEIGHT,
        "#2ed573"
      );
    }
  };

  const drawFrame = () => {
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
  };

  useEffect(() => {
    socket.on("MATCH_PONG_STATE", updateServerBallPosition);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        socket.emit(
          "PONG_PADDLE_MOVEMENT",
          tournamentCode,
          socket.userID,
          true,
          (event.key === "ArrowRight") === isPlayerOne
        );
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        socket.emit(
          "PONG_PADDLE_MOVEMENT",
          tournamentCode,
          socket.userID,
          false,
          (event.key === "ArrowRight") === isPlayerOne
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      socket.off("MATCH_PONG_STATE", updateServerBallPosition);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [tournamentCode, isPlayerOne]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(drawFrame);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="bg-white p-1">
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        style={{
          transform: `rotate(${isPlayerOne ? "180deg" : "0deg"})`,
        }}
      />
    </div>
  );
};

export { Pong };
