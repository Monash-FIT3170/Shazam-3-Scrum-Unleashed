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
    requestAnimationFrame(() => {
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
        y: serverPaddleStates[0].y * SCALING_FACTOR - PADDLE_HEIGHT,
      };
      paddle2Position.current = {
        ...serverPaddleStates[1],
        width: serverPaddleStates[1].width * SCALING_FACTOR,
        x: serverPaddleStates[1].x * SCALING_FACTOR,
        y: serverPaddleStates[1].y * SCALING_FACTOR,
      };

      lastUpdateTime.current = performance.now();
    });
  };

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    // Background
    ctx.fillStyle = "#22026c";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, GAME_WIDTH - 4, GAME_HEIGHT - 4);
  
    // Center line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, GAME_HEIGHT / 2);
    ctx.lineTo(GAME_WIDTH, GAME_HEIGHT / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  
    // Ball
    ctx.fillStyle = "#ff00ff";
    ctx.beginPath();
    ctx.arc(ballState.current.x, ballState.current.y, BALL_RADIUS * SCALING_FACTOR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
  
    // Paddles
    const drawPaddle = (x: number, y: number, width: number, height: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    };
  
    if (paddle1Position.current) {
      drawPaddle(
        paddle1Position.current.x,
        paddle1Position.current.y,
        paddle1Position.current.width,
        PADDLE_HEIGHT,
        "#ff4757"
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
    if (!ctx) return

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
    <canvas
      ref={canvasRef}
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      style={{
        transform: `rotate(${isPlayerOne ? "180deg" : "0deg"})`,
      }}
    />
  );
};

export { Pong };
