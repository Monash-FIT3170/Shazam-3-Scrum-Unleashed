//This is responsible for displaying the moves of the Players
//By Anand Vannalath

import paperWin from "../assets/Duel/Paper.svg";
import paperLose from "../assets/Duel/Paper-Outline.svg";
import rockWin from "../assets/Duel/Rock.svg";
import rockLose from "../assets/Duel/Rock-Outline.svg";
import scissorsWin from "../assets/Duel/Scissors.svg";
import scissorsLose from "../assets/Duel/Scissors-Outline.svg";

interface MoveProps {
  score1: number;
  score2: number;
  move: string;
  result: string;
}

const DuelMove = ({ score1, score2, move, result }: MoveProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    //Mobile screen
    if (result === "win") {
      //Player wins
      if (move === "paper") {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full content-center object-fit"
              src={paperWin}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={rockLose}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">YOU WIN</p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - <span className="text-green-600">{score1}</span>
              </p>
            </div>
          </div>
        );
      } else if (move === "scissors") {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={scissorsWin}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={paperLose}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">YOU WIN</p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - <span className="text-green-600">{score1}</span>
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={rockWin}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={scissorsLose}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">YOU WIN</p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - <span className="text-green-600">{score1}</span>
              </p>
            </div>
          </div>
        );
      }
    } else if (result === "lose") {
      //Player Loses
      if (move === "paper") {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={paperLose}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={scissorsWin}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">
                YOU LOSE
              </p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - <span className="text-green-600">{score1}</span>
              </p>
            </div>
          </div>
        );
      } else if (move === "scissors") {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={scissorsLose}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={rockWin}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">
                YOU LOSE
              </p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - <span className="text-green-600">{score1}</span>
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={rockLose}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={paperWin}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">
                YOU LOSE
              </p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - <span className="text-green-600">{score1}</span>
              </p>
            </div>
          </div>
        );
      }
    } else {
      if (move === "paper") {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={paperWin}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={paperWin}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">YOU TIE</p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - <span>{score1}</span>
              </p>
            </div>
          </div>
        );
      } else if (move === "scissors") {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={scissorsWin}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={scissorsWin}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">YOU TIE</p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - {score1}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex h-screen w-screen">
            <img
              style={{ position: "fixed", height: 600, bottom: -300 }}
              className="flex w-full align-top content-center object-fit"
              src={rockWin}
            />
            <img
              style={{ position: "fixed", height: 600, top: -300 }}
              className="flex w-full rotate-180 content-center object-fit"
              src={rockWin}
            />
            <div className="h-screen w-screen flex flex-col items-center justify-center">
              <p className="text-7xl text-white font-bold font-sans">YOU TIE</p>
              <p className="text-7xl text-white font-bold font-sans">
                {score2} - {score1}
              </p>
            </div>
          </div>
        );
      }
    } //Player ties
  } else {
    //Laptop or larger screen
    if (result === "win") {
      if (move === "paper") {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={paperWin}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={rockLose}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">YOU WIN</p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - <span className="text-green-600">{score1}</span>
                </p>
              </div>
            </div>
          </div>
        );
      } else if (move === "scissors") {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={scissorsWin}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={paperLose}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">YOU WIN</p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - <span className="text-green-600">{score1}</span>
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={rockWin}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={scissorsLose}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">YOU WIN</p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - <span className="text-green-600">{score1}</span>
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else if (result === "lose") {
      if (move === "paper") {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={paperLose}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={scissorsWin}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">
                YOU LOSE
              </p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - <span className="text-green-600">{score1}</span>
                </p>
              </div>
            </div>
          </div>
        );
      } else if (move === "scissors") {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={scissorsLose}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={rockWin}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">
                YOU LOSE
              </p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - <span className="text-green-600">{score1}</span>
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={rockLose}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={paperWin}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">
                YOU LOSE
              </p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - <span className="text-green-600">{score1}</span>
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (move === "paper") {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={paperWin}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={paperWin}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">YOU TIE</p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - {score1}
                </p>
              </div>
            </div>
          </div>
        );
      } else if (move === "scissors") {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={scissorsWin}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={scissorsWin}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">YOU TIE</p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - {score1}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  bottom: -450,
                }}
                className="flex object-fit"
                src={rockWin}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                style={{
                  position: "fixed",
                  height: 800,
                  width: 300,
                  top: -450,
                }}
                className="flex rotate-180 content-center object-fit"
                src={rockWin}
              />
            </div>
            <div
              style={{ bottom: 165 }}
              className="flex flex-col justify-center h-screen items-center"
            >
              <p className="text-8xl text-white font-bold font-sans">YOU TIE</p>
              <div className="flex justify-center">
                <p className="text-6xl text-white font-bold font-sans">
                  {score2} - {score1}
                </p>
              </div>
            </div>
          </div>
        );
      }
    } //Player ties
  }
};

export default DuelMove;
