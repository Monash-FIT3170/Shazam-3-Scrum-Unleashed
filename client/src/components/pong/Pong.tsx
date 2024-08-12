import { useEffect, useState, useRef } from "react";
import { socket } from "../../App";
import { PongBallState, PongPaddleState } from "../../../../types/types.ts";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const BALL_SIZE = 10;

const Ball = ({ x, y }: { x: number; y: number }) => (
  <div
    className="absolute bg-white rounded-full translate-x-1/2 -translate-y-1/2"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${BALL_SIZE}px`,
      height: `${BALL_SIZE}px`,
    }}
  />
);

const Paddle = ({ x, y, width, top }: PongPaddleState & { top: boolean }) => (
  <div
    className={
      "absolute bg-white " + (top ? "origin-bottom -translate-y-full" : "")
    }
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${width}%`,
      height: `2%`,
    }}
  />
);

type PongProps = {
  tournamentCode: string;
  isPlayerOne: boolean;
};

const Pong = ({ tournamentCode, isPlayerOne }: PongProps) => {
  const [ballState, setBallState] = useState<PongBallState>({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2,
    xVelocity: 0,
    yVelocity: 0,
  });
  const [paddle1Position, setPaddle1Position] = useState<PongPaddleState>();
  const [paddle2Position, setPaddle2Position] = useState<PongPaddleState>();
  const lastUpdateTime = useRef(performance.now());
  const animationFrameId = useRef<number>();

  const updateServerBallPosition = (
    ballState: PongBallState,
    paddleStates: PongPaddleState[]
  ) => {
    requestAnimationFrame(() => {
      setBallState(ballState);
      setPaddle1Position(paddleStates[0]);
      setPaddle2Position(paddleStates[1]);
      lastUpdateTime.current = performance.now();
      console.log("Update from server")
    });
  };

  const animateBall = () => {
    console.log("animating ball");
    const now = performance.now();
    const deltaTime = (now - lastUpdateTime.current) / 1000;
    console.log(deltaTime);
    lastUpdateTime.current = now;
  
    setBallState(prevState => {
      const newX = prevState.x + prevState.xVelocity * deltaTime;
      const newY = prevState.y + prevState.yVelocity * deltaTime;
      const boundedX = Math.max(0, Math.min(newX, 100));
  
      return {
        ...prevState,
        x: boundedX,
        y: newY,
      };
    });
    animationFrameId.current = requestAnimationFrame(animateBall);
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
    console.log("kicking off request animation loop")
    animationFrameId.current = requestAnimationFrame(animateBall);
    return () => {
      if (animationFrameId.current) {
        console.log("cancelling animation request frame")
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      className="relative bg-black"
      style={{
        width: `${GAME_WIDTH}px`,
        height: `${GAME_HEIGHT}px`,
        transform: `rotate(${isPlayerOne ? "180deg" : "0deg"})`,
      }}
    >
      <div
        className="justify-center items-center flex text-white text-5xl"
        style={{
          height: `${GAME_HEIGHT}px`,
        }}
      ></div>
      <Ball x={ballState.x} y={ballState.y} />
      {paddle1Position && (
        <Paddle
          x={paddle1Position.x}
          y={paddle1Position.y}
          width={paddle1Position.width}
          direction={paddle1Position.direction}
          top
        />
      )}
      {paddle2Position && (
        <Paddle
          x={paddle2Position.x}
          y={paddle2Position.y}
          width={paddle2Position.width}
          direction={paddle2Position.direction}
          top={false}
        />
      )}
    </div>
  );
};

export { Pong };
