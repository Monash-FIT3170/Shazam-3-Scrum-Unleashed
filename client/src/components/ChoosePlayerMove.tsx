import {  useState } from "react";
import RockOption from '../assets/ChooseMove/RockOption.svg';
import PaperOption from "../assets/ChooseMove/PaperOption.svg";
import ScissorsOption from "../assets/ChooseMove/ScissorOption.svg";

type MoveType = "rock" | "paper" | "scissors";

const ChoosePlayerMove = () => {
   const [, setSelectedMove] = useState<MoveType | null>(null);

  const handleMoveSelection = (move: MoveType) => {
    setSelectedMove(move);
    console.log("Selected move:", move);
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center w-full">
      <p className="text-white text-3xl font-bold mb-9">CHOOSE A MOVE</p>
      <div className="flex justify-center items-center">
        <button onClick={() => handleMoveSelection("rock")} className="w-1/5 focus:outline-none">
          <img src={RockOption} alt="Rock" className="w-full" />
        </button>
        <button onClick={() => handleMoveSelection("paper")} className="w-1/5 mx-4 focus:outline-none">
          <img src={PaperOption} alt="Paper" className="w-full" />
        </button>
        <button onClick={() => handleMoveSelection("scissors")} className="w-1/5 focus:outline-none">
          <img src={ScissorsOption} alt="Scissors" className="w-full" />
        </button>
      </div>
    </div>
  );
};

export default ChoosePlayerMove;
