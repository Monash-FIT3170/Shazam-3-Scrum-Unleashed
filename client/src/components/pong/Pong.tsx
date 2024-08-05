import { useState, useEffect } from 'react';
import { socket } from '../../App';
import {PongPaddleState} from "../../../../types/types.ts";

interface BallPosition {
  x: number;
  y: number;
}

const GAME_WIDTH = 350;
const GAME_HEIGHT = 600;
const BALL_SIZE = 10;

const Ball = ({ x, y }: BallPosition) => (
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

const Paddle = ( { x, y, width, top } : PongPaddleState & { top: boolean }) => (
    <div
        className={"absolute bg-white " + (top ? "origin-bottom -translate-y-full" : "")}
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${width}%`,
            height: `2%`,
        }}
    />
);


const Pong = () => {
    const [ballPosition, setBallPosition] = useState<BallPosition>({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
    const [paddle1Position, setPaddle1Position] = useState<PongPaddleState>();
    const [paddle2Position, setPaddle2Position] = useState<PongPaddleState>();
    const [player1Score, setPlayer1Score] = useState<number>(0);
    const [player2Score, setPlayer2Score] = useState<number>(0);

  useEffect(() => {

    // read initial position from backend
    socket.on("PONG_STATE", (ballPosition, players, paddlePositions, score) => {
        setBallPosition( { x: ballPosition.x, y: ballPosition.y})
        setPaddle1Position(paddlePositions[0]);
        setPaddle2Position(paddlePositions[1]);
        setPlayer1Score(score[0]);
        setPlayer2Score(score[1]);
    })


    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
          socket.emit('PONG_PADDLE_MOVEMENT', true, true);
      } else if (event.key === 'ArrowRight') {
          socket.emit('PONG_PADDLE_MOVEMENT', true, false);
      }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') {
            socket.emit('PONG_PADDLE_MOVEMENT', false, true);
        } else if (event.key === 'ArrowRight') {
            socket.emit('PONG_PADDLE_MOVEMENT', false, false);
        }
    });


  }, []);

  return (


          <div
              className="relative bg-black"
              style={{width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px`}}
          >
              <div className="justify-center items-center flex text-white text-5xl" style={{
                  height: `${GAME_HEIGHT}px`
              }}>
                  {player1Score} : {player2Score}
              </div>
              <Ball x={ballPosition.x} y={ballPosition.y}/>
              {paddle1Position !== undefined &&
                  <Paddle x={paddle1Position.x} y={paddle1Position.y} width={paddle1Position.width}
                          direction={paddle1Position.direction} top/>
                          }
              {paddle2Position !== undefined &&
                  <Paddle x={paddle2Position.x} y={paddle2Position.y} width={paddle2Position.width}
                          direction={paddle2Position.direction} top={false}/>}
          </div>

  );
};


export {Pong};