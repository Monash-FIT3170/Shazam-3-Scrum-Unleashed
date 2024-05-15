//This is responsible for displaying the moves of the Players
//By Anand Vannalath

import PlayerMoveHand from "./PlayerMove";
import { Action } from "../../../types/types";
import { Result, HandImgType } from "../types";
import DuelScore from "./DuelScore";

interface MoveProps {
  score1: number;
  score2: number;
  move: Action;
  result: Result;
}

// const DuelMove = ({ score1, score2, move, result }: MoveProps) => {
//     //Mobile screen
//     if (result === "win") {
//       //Player wins
//       if (move === "paper") {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full content-center object-fit"
//               src={paperWin}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={rockLose}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">YOU WIN</p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - <span className="text-green-600">{score1}</span>
//               </p>
//             </div>
//           </div>
//         );
//       } else if (move === "scissors") {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={scissorsWin}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={paperLose}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">YOU WIN</p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - <span className="text-green-600">{score1}</span>
//               </p>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={rockWin}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={scissorsLose}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">YOU WIN</p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - <span className="text-green-600">{score1}</span>
//               </p>
//             </div>
//           </div>
//         );
//       }
//     } else if (result === "lose") {
//       //Player Loses
//       if (move === "paper") {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={paperLose}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={scissorsWin}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">
//                 YOU LOSE
//               </p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - <span className="text-green-600">{score1}</span>
//               </p>
//             </div>
//           </div>
//         );
//       } else if (move === "scissors") {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={scissorsLose}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={rockWin}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">
//                 YOU LOSE
//               </p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - <span className="text-green-600">{score1}</span>
//               </p>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={rockLose}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={paperWin}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">
//                 YOU LOSE
//               </p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - <span className="text-green-600">{score1}</span>
//               </p>
//             </div>
//           </div>
//         );
//       }
//     } else {
//       if (move === "paper") {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={paperWin}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={paperWin}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">YOU TIE</p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - <span>{score1}</span>
//               </p>
//             </div>
//           </div>
//         );
//       } else if (move === "scissors") {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={scissorsWin}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={scissorsWin}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">YOU TIE</p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - {score1}
//               </p>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div className="flex h-screen w-screen">
//             <img
//               style={{ position: "fixed", height: 600, bottom: -300 }}
//               className="flex w-full align-top content-center object-fit"
//               src={rockWin}
//             />
//             <img
//               style={{ position: "fixed", height: 600, top: -300 }}
//               className="flex w-full rotate-180 content-center object-fit"
//               src={rockWin}
//             />
//             <div className="h-screen w-screen flex flex-col items-center justify-center">
//               <p className="text-7xl text-white font-bold font-sans">YOU TIE</p>
//               <p className="text-7xl text-white font-bold font-sans">
//                 {score2} - {score1}
//               </p>
//             </div>
//           </div>
//         );
//       }
//     } //Player ties
//   } else {
//     //Laptop or larger screen
//     if (result === "win") {
//       if (move === "paper") {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={paperWin}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={rockLose}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">YOU WIN</p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - <span className="text-green-600">{score1}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       } else if (move === "scissors") {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={scissorsWin}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={paperLose}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">YOU WIN</p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - <span className="text-green-600">{score1}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={rockWin}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={scissorsLose}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">YOU WIN</p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - <span className="text-green-600">{score1}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       }
//     } else if (result === "lose") {
//       if (move === "paper") {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={paperLose}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={scissorsWin}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">
//                 YOU LOSE
//               </p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - <span className="text-green-600">{score1}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       } else if (move === "scissors") {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={scissorsLose}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={rockWin}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">
//                 YOU LOSE
//               </p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - <span className="text-green-600">{score1}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={rockLose}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={paperWin}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">
//                 YOU LOSE
//               </p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - <span className="text-green-600">{score1}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       }
//     } else {
//       if (move === "paper") {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={paperWin}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={paperWin}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">YOU TIE</p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - {score1}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       } else if (move === "scissors") {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={scissorsWin}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={scissorsWin}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">YOU TIE</p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - {score1}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   bottom: -450,
//                 }}
//                 className="flex object-fit"
//                 src={rockWin}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 style={{
//                   position: "fixed",
//                   height: 800,
//                   width: 300,
//                   top: -450,
//                 }}
//                 className="flex rotate-180 content-center object-fit"
//                 src={rockWin}
//               />
//             </div>
//             <div
//               style={{ bottom: 165 }}
//               className="flex flex-col justify-center h-screen items-center"
//             >
//               <p className="text-8xl text-white font-bold font-sans">YOU TIE</p>
//               <div className="flex justify-center">
//                 <p className="text-6xl text-white font-bold font-sans">
//                   {score2} - {score1}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       }
//     } //Player ties
//   }
// };

const DuelMove = ({score1, score2, move, result}: MoveProps) => {
  var opponentMove:Action = "NONE";
  let playerHandType:HandImgType = "NONE";
  let opponentHandType:HandImgType = "NONE";

  if (result === "WIN") {
    playerHandType = "FILLED";
    opponentHandType = "OUTLINED";

    if (move === "PAPER") {
      opponentMove = "ROCK"
    }
    else if (move === "ROCK") {
      opponentMove = "SCISSORS"
    }
    else {
      opponentMove = "PAPER"
    }
  }
  else if (result === "LOSE") {
    playerHandType = "OUTLINED";
    opponentHandType = "FILLED";
    
    if (move === "PAPER") {
      opponentMove = "SCISSORS"
    }
    else if (move === "ROCK") {
      opponentMove = "PAPER"
    }
    else {
      opponentMove = "ROCK"
    }
  }
  else {
    playerHandType = opponentHandType = "FILLED";
    opponentMove = move;
  }

  return (
    <div>
      <PlayerMoveHand playerMove={move} isOpponent={false} handType={playerHandType}/>
      <PlayerMoveHand playerMove={opponentMove} isOpponent={true} handType={opponentHandType}/>
      <DuelScore score1={score1} score2={score2} result={result}/>
    </div>
  )
}

export default DuelMove;