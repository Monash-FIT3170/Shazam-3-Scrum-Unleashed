import shazamLogo from "../assets/Duel/SHAZAM.svg";

interface LoadProps {
  phase: number;
}

const PlayerLoad = ({phase}: LoadProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    if (phase === 0) {
      return <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
        <p className="text-8xl text-white font-bold font-sans">ROCK</p>
      </div>
    }
    else if (phase === 1) {
      return <div style={{position: "fixed", bottom: 150, left: 70, height: 500, width: 250}} className="flex flex-col justify-center content-end">
        <p className="text-8xl text-white font-bold font-sans">PAPER</p>
      </div>
    }
    else if (phase === 2) {
      return <div style={{position: "fixed", bottom: 100, left: 30, height: 600, width:350}} className="flex flex-col justify-center content-end">
        <img className="object-cover" src={shazamLogo}/>
      </div>
      }
    }
  else {
    if (phase === 0) {
      return <div style={{position: "fixed", bottom: 200, left: 650, height: 500, width:250}} className="flex flex-col justify-center content-end">
        <p className="text-white font-bold font-sans" style={{fontSize: 200}}>ROCK</p>
      </div>
    }
    else if (phase === 1) {
      return <div style={{position: "fixed", bottom: 200, left: 650, height: 500, width:250}} className="flex flex-col justify-center content-end">
        <p className="text-white font-bold font-sans" style={{fontSize: 200}}>PAPER</p>
      </div>
    }
    else if (phase === 2) {
      return <div style={{position: "fixed", bottom: 50, left: 650, height: 900, width:550}} className="flex flex-col justify-center content-end">
        <img className="object-cover" src={shazamLogo}/>
      </div>
      }
    }
  }

export default PlayerLoad;