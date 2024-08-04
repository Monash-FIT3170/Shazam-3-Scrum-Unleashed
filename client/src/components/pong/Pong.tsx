import { useState, useEffect } from 'react';
import { socket } from '../../App';

interface BallPosition {
  x: number;
  y: number;
}

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const BALL_SIZE = 10;

const Ball = ({ x, y }: BallPosition) => (
  <div
    className="absolute bg-white rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${BALL_SIZE}px`,
      height: `${BALL_SIZE}px`,
    }}
  />
);

const Pong = () => {
    const [ballPosition, setBallPosition] = useState<BallPosition>({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });

  useEffect(() => {

    // read initial position from backend
    socket.on("PONG_STATE", (ballPosition, players, paddlePositions, isDuelComplete) => {
        setBallPosition( { x: ballPosition.x, y: ballPosition.y})
    })
  }, []);

  return (
      <div
        className="relative bg-black"
        style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
      >
        <Ball x={ballPosition.x} y={ballPosition.y} />
      </div>
  );
};

export { Pong };