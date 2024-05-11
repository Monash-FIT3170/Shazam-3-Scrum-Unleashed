//This is responsible for loading the buildup of a Duel
//By Anand Vannalath

import shazamLogo from "../assets/Duel/SHAZAM.svg"
import closed from "../assets/Duel/Hand.svg";
import explosion from "../assets/Duel/Explosion.svg";

interface LoadProps {
  phase: number;
}

const duelLoad = ({phase}: LoadProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    if (phase === 0) {
      return <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
        <p className="text-8xl text-violet-500 font-bold font-sans">ROCK</p>
      </div>
    }
    else if (phase === 1) {
      return <div style={{position: "fixed", bottom: 150, left: 70, height: 500, width: 250}} className="flex flex-col justify-center content-end">
        <p className="text-8xl text-green-400 font-bold font-sans">PAPER</p>
      </div>
    }
    else if (phase === 2) {
      return <div>
        <img style={{position: "fixed", top: -400, left: 20, height: 600, width: 600}} className="rotate-180 object-fit" src={closed}/>
        <img style={{position: "fixed", bottom: -400, left: 20, height: 600, width: 600}} className="object-fit" src={closed}/>
        <div style={{position: "fixed", bottom: 100, left: 30, height: 600, width:350}} className="flex flex-col justify-center content-end">
          <img className="object-cover" src={shazamLogo}/>
        </div>
      </div>
      }
    else if (phase === 3) {
      return <div>
        <img style={{position: "fixed", top: -50, left: 20, height: 600, width: 600}} className="rotate-180 object-fit" src={closed}/>
        <img style={{position: "fixed", bottom: -50, height: 600, width: 600}} className="object-fit" src={closed}/>
        <img style={{position: "fixed", height: 800, top: -10}}src={explosion}/>
      </div>
    }
  }
  else {
    if (phase === 0) {
      return <div style={{position: "fixed", bottom: 200, left: 650, height: 500, width:250}} className="flex flex-col justify-center content-end">
        <p className="text-violet-500 font-bold font-sans" style={{fontSize: 200}}>ROCK</p>
      </div>
    }
    else if (phase === 1) {
      return <div style={{position: "fixed", bottom: 200, left: 650, height: 500, width:250}} className="flex flex-col justify-center content-end">
        <p className="text-green-400 font-bold font-sans" style={{fontSize: 200}}>PAPER</p>
      </div>
    }
    else if (phase === 2) {
      return <div>
        <img style={{position: "fixed", top: -650, left: 400, height: 1000, width: 1000}} className="rotate-180 object-fit" src={closed}/>
        <img style={{position: "fixed", bottom: -650, left: 400, height: 1000, width: 1000}} className="object-fit" src={closed}/>
        <div style={{position: "fixed", bottom: 50, left: 650, height: 800, width:550}} className="flex flex-col justify-center content-end">
          <img className="object-cover" src={shazamLogo}/>
        </div>
      </div>
      }
      else if (phase === 3){
        return <div>
          <img style={{position: "fixed", top: -300, left: 400, height: 1000, width: 1000}} className="rotate-180 object-fit" src={closed}/>
          <img style={{position: "fixed", bottom: -300, left: 400, height: 1000, width: 1000}} className="object-fit" src={closed}/>
          <img style={{position: "fixed", height: 800, top: 60, left: 500}}src={explosion}/>
        </div>
      }
    }
  }

export default duelLoad;