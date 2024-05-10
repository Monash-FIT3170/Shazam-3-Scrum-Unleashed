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

const PlayerMove = ({type, win}: PlayerMoveProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    if (win === true) {
      if (type === "paper") {
        return <div style={{position: "fixed", bottom: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
        <img className="object-cover" src={paperWin}/>
      </div>
      }
      else if (type === "scissors") {
        return <div style={{position: "fixed", bottom: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
        <img className="object-cover" src={scissorsWin}/>
      </div>
      }
      else {
        return <div style={{position: "fixed", bottom: -250, left: 90, height: 500, width:200}} className="flex justify-center content-end">
        <img className="object-cover" src={rockWin}/>
      </div>
      }
    }
    else {
      if (type === "paper") {
        return <div style={{position: "fixed", top: -250, left: 90, height: 500, width:200}} className="flex justify-center  content-end">
        <img className="object-cover rotate-180" src={paperLose}/>
      </div>
      }
      else if (type === "scissors") {
        return <div style={{position: "fixed", top: -250, left: 90, height: 500, width:200}} className="flex justify-center  content-end">
        <img className="object-cover rotate-180" src={scissorsLose}/>
      </div>
      }
      else {
        return <div style={{position: "fixed", top: -250, left: 90, height: 500, width:200}} className="flex justify-center  content-end">
        <img className="object-cover rotate-180" src={rockLose}/>
      </div>
      }
    }
  }
  else {
    if (win === true) {
      if (type === "paper") {
        return <div style={{position: "fixed", bottom: -450, left: 650, height: 800, width:500}} className="flex justify-center content-end">
        <img className="object-cover" src={paperWin}/>
      </div>
      }
      else if (type === "scissors") {
        return <div style={{position: "fixed", bottom: -450, left: 650, height: 800, width:500}} className="flex justify-center content-end">
        <img className="object-cover" src={scissorsWin}/>
      </div>
      }
      else {
        return <div style={{position: "fixed", bottom: -450, left: 650, height: 800, width:500}} className="flex justify-center content-end">
        <img className="object-cover" src={rockWin}/>
      </div>
      }
    }
    else {
      if (type === "paper") {
        return <div style={{position: "fixed", top: -450, left: 650, height: 800, width:500}} className="flex justify-center  content-end">
        <img className="object-cover rotate-180" src={paperLose}/>
      </div>
      }
      else if (type === "scissors") {
        return <div style={{position: "fixed", top: -450, left: 650, height: 800, width:500}} className="flex justify-center  content-end">
        <img className="object-cover rotate-180" src={scissorsLose}/>
      </div>
      }
      else {
        return <div style={{position: "fixed", top: -450, left: 650, height: 800, width:500}} className="flex justify-center  content-end">
        <img className="object-cover rotate-180" src={rockLose}/>
      </div>
      }
    }
  }
}

export default PlayerMove;