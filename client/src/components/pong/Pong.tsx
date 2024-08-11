import { useEffect, useState } from "react";
import { socket } from "../../App";
import { PongPaddleState } from "../../../../types/types.ts";

interface BallPosition {
  x: number;
  y: number;
}

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const BALL_SIZE = 4;

const Ball = ({ x, y }: BallPosition) => (
  <div
    className="absolute bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      height: `${BALL_SIZE * (GAME_HEIGHT / 100)}px`,
      width: `${BALL_SIZE * (GAME_WIDTH / 100)}px`,
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
  const [ballPosition, setBallPosition] = useState<BallPosition>({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2,
  });
  const [paddle1Position, setPaddle1Position] = useState<PongPaddleState>();
  const [paddle2Position, setPaddle2Position] = useState<PongPaddleState>();

  useEffect(() => {
    socket.on("MATCH_PONG_STATE", (ballState, paddleStates) => {
      requestAnimationFrame(() => {
        setBallPosition(ballState);
        setPaddle1Position(paddleStates[0]);
        setPaddle2Position(paddleStates[1]);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        socket.emit(
          "PONG_PADDLE_MOVEMENT",
          tournamentCode,
          socket.userID,
          true,
          isPlayerOne ? false : true,
        );
      } else if (event.key === "ArrowRight") {
        socket.emit(
          "PONG_PADDLE_MOVEMENT",
          tournamentCode,
          socket.userID,
          true,
          isPlayerOne ? true : false,
        );
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft") {
        socket.emit(
          "PONG_PADDLE_MOVEMENT",
          tournamentCode,
          socket.userID,
          false,
          isPlayerOne ? false : true,
        );
      } else if (event.key === "ArrowRight") {
        socket.emit(
          "PONG_PADDLE_MOVEMENT",
          tournamentCode,
          socket.userID,
          false,
          isPlayerOne ? true : false,
        );
      }
    });
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
      <Ball x={ballPosition.x} y={ballPosition.y} />
      {paddle1Position !== undefined && (
        <Paddle
          x={paddle1Position.x}
          y={paddle1Position.y}
          width={paddle1Position.width}
          direction={paddle1Position.direction}
          top
        />
      )}
      {paddle2Position !== undefined && (
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
