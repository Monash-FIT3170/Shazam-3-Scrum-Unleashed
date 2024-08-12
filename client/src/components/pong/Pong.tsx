import { useEffect, useRef } from "react";
import { socket } from "../../App";
import { PongBallState, PongPaddleState } from "../../../../types/types.ts";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const BALL_SIZE = 10;
const PADDLE_HEIGHT = GAME_HEIGHT * 0.02;


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
        x: serverBallState.x * (GAME_WIDTH / 100),
        y: serverBallState.y * (GAME_WIDTH / 100),
        xVelocity: serverBallState.xVelocity * (GAME_WIDTH / 100),
        yVelocity: serverBallState.yVelocity * (GAME_WIDTH / 100),
      };
      paddle1Position.current = {
        ...serverPaddleStates[0],
        width: serverPaddleStates[0].width * (GAME_WIDTH / 100),
        x: serverPaddleStates[0].x * (GAME_WIDTH / 100),
        y: serverPaddleStates[0].y * (GAME_WIDTH / 100) - PADDLE_HEIGHT,
      };
      paddle2Position.current = {
        ...serverPaddleStates[1],
        width: serverPaddleStates[1].width * (GAME_WIDTH / 100),
        x: serverPaddleStates[1].x * (GAME_WIDTH / 100),
        y: serverPaddleStates[1].y * (GAME_WIDTH / 100),
      };

      lastUpdateTime.current = performance.now();
    });
  };

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ballState.current.x, ballState.current.y, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    if (paddle1Position.current) {
      ctx.fillRect(
        paddle1Position.current.x,
        paddle1Position.current.y,
        paddle1Position.current.width,
        PADDLE_HEIGHT
      );
    }

    if (paddle2Position.current) {
      ctx.fillRect(
        paddle2Position.current.x,
        paddle2Position.current.y,
        paddle2Position.current.width,
        PADDLE_HEIGHT
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
