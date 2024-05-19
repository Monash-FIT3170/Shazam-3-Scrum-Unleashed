//This is responsible for loading the buildup of a Duel
//By Anand Vannalath

import shazamLogo from "../assets/Duel/SHAZAM.svg";
import closed from "../assets/Duel/Hand.svg";
import explosion from "../assets/Duel/Explosion.svg";

interface LoadProps {
  phase: number;
}

const DuelLoad = ({ phase }: LoadProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    if (phase === 0) {
      return (
        <div className="h-screen flex items-center justify-center">
          <p className="text-8xl text-violet-500 font-bold font-sans">ROCK</p>
        </div>
      );
    } else if (phase === 1) {
      return (
        <div className="h-screen flex items-center justify-center">
          <p className="text-8xl text-green-400 font-bold font-sans">PAPER</p>
        </div>
      );
    } else if (phase === 2) {
      return (
        <div className="flex h-screen w-screen">
          <img
            style={{ position: "absolute", height: 600, top: -400 }}
            className="flex w-full align-top content-center rotate-180 object-fit"
            src={closed}
          />
          <img
            style={{ position: "absolute", height: 600, bottom: -400 }}
            className="flex w-full align-top content-center object-fit"
            src={closed}
          />
          <div className="h-screen flex items-center justify-center">
            <img className="object-cover" src={shazamLogo} />
          </div>
        </div>
      );
    } else if (phase === 3) {
      return (
        <div>
          <div className="flex w-full content-center z-0">
            <img
              style={{ position: "absolute", height: 600, top: -50 }}
              className="w-full rotate-180 object-fit"
              src={closed}
            />
          </div>
          <div className="flex w-full content-center z-0">
            <img
              style={{ position: "absolute", height: 600, bottom: -50 }}
              className="w-full object-fit"
              src={closed}
            />
          </div>
          <div className="h-screen flex items-center justify-center z-10">
            <img
              style={{ position: "absolute", height: 600 }}
              className="object-fit"
              src={explosion}
            />
          </div>
        </div>
      );
    }
  } else {
    if (phase === 0) {
      return (
        <div className="h-screen flex items-center justify-center">
          <p
            className="text-violet-500 font-bold font-sans"
            style={{ fontSize: 200 }}
          >
            ROCK
          </p>
        </div>
      );
    } else if (phase === 1) {
      return (
        <div className="h-screen flex items-center justify-center">
          <p
            className="text-green-400 font-bold font-sans"
            style={{ fontSize: 200 }}
          >
            PAPER
          </p>
        </div>
      );
    } else if (phase === 2) {
      return (
        <div>
          <div className="h-screen flex items-center justify-center">
            <img
              style={{ position: "fixed" }}
              className="object-cover"
              src={shazamLogo}
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              style={{
                position: "fixed",
                height: 800,
                width: 300,
                bottom: -450,
              }}
              className="flex object-fit"
              src={closed}
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              style={{ position: "fixed", height: 800, width: 300, top: -450 }}
              className="flex rotate-180 content-center object-fit"
              src={closed}
            />
          </div>
        </div>
      );
    } else if (phase === 3) {
      return (
        <div>
          <div className="flex justify-center items-center z-0">
            <img
              style={{
                position: "fixed",
                height: 800,
                width: 300,
                bottom: -100,
              }}
              className="flex object-fit"
              src={closed}
            />
          </div>
          <div className="flex justify-center items-center z-0">
            <img
              style={{ position: "fixed", height: 800, width: 300, top: -100 }}
              className="flex rotate-180 content-center object-fit"
              src={closed}
            />
          </div>
          <div className="h-screen flex items-center justify-center z-10">
            <img
              style={{ position: "fixed", height: 600 }}
              className="object-fit"
              src={explosion}
            />
          </div>
        </div>
      );
    }
  }
};

export default DuelLoad;
