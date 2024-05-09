import paperWin from "../assets/Duel/Paper.svg";
import paperLose from "../assets/Duel/Paper-Outline.svg"
import rockWin from "../assets/Duel/Rock.svg"
import rockLose from "../assets/Duel/Rock-Outline.svg"
import scissorsWin from "../assets/Duel/Scissors.svg"
import scissorsLose from "../assets/Duel/Scissors-Outline.svg"

interface PlayerMoveProps {
  type: string;
  win: boolean;
}

const PlayerMoveMobile = ({type, win}: PlayerMoveProps) => {
  return (
    <div>
      {win === true && type === "paper" && (
        <div style={{position: "fixed", bottom: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
          <img className="object-cover" src={paperWin}/>
        </div>
      )}
      {win === true && type === "scissors" && (
      <div style={{position: "fixed", bottom: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
        <img className="object-cover" src={scissorsWin}/>
      </div>
      )}
      {win === true && type === "rock" && (
      <div style={{position: "fixed", bottom: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
        <img className="object-cover" src={rockWin}/>
      </div>
      )}
      {win === false && type === "paper" && (
      <div style={{position: "fixed", top: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
        <img className="object-cover rotate-180" src={paperLose}/>
      </div>
      )}
      {win === false && type === "scissors" && (
      <div style={{position: "fixed", top: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
      <img className="object-cover rotate-180" src={scissorsLose}/>
      </div>
      )}
      {win === false && type === "rock" && (
      <div style={{position: "fixed", top: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
      <img className="object-cover rotate-180" src={rockLose}/>
      </div>
      )}
    </div>
  )
}

export default PlayerMoveMobile;