//This displays the name of the players in a Duel

import star from "../assets/Duel/Star 2.svg";
import { PlayerAttributes } from "../../../types/types.ts";

interface DuelNameProps {
  players: PlayerAttributes[];
}

const DuelName = ({ players }: DuelNameProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    // TODO
    return (
      <div>
        <div className="fixed top-1 right-3 text-2xl text-white font-bold font-sans">
          {players[0].name}
        </div>
        <div className="flex fixed bottom-1 left-3 text-2xl text-white font-bold font-sans">
          {players[1].name}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="fixed top-5 right-8 text-2xl text-white font-bold font-sans bg-orange-600 rounded-md px-7 py-3">
          {players[0].name}
          <div className="flex flex-row justify-between gap-x-4">
            <img style={{ height: 30 }} className="object-fit" src={star} />
            <img style={{ height: 30 }} className="object-fit" src={star} />
            <img style={{ height: 30 }} className="object-fit" src={star} />
          </div>
        </div>
        <div>
          <div className="fixed bottom-5 left-8 text-2xl text-white font-bold font-sans bg-lime-600 rounded-md px-7 py-3">
            {players[1].name}
            <div className="flex flex-row justify-between gap-x-4">
              <img style={{ height: 30 }} className="object-fit" src={star} />
              <img style={{ height: 30 }} className="object-fit" src={star} />
              <img style={{ height: 30 }} className="object-fit" src={star} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DuelName;
