//This displays the name of the players in a Duel

import star from "../assets/Duel/Star 2.svg";

interface DuelNameProps {
  name1: string;
  name2: string;
}

const DuelName = ({ name1, name2 }: DuelNameProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    return (
      <div>
        <div className="fixed top-1 right-3 text-2xl text-white font-bold font-sans">
          {name1}
        </div>
        <div className="flex fixed bottom-1 left-3 text-2xl text-white font-bold font-sans">
          {name2}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="fixed top-5 right-8 text-2xl text-white font-bold font-sans bg-orange-600 rounded-md px-7 py-3">
          {name1}
          <div className="flex flex-row justify-between gap-x-4">
            <img style={{ height: 30 }} className="object-fit" src={star} />
            <img style={{ height: 30 }} className="object-fit" src={star} />
            <img style={{ height: 30 }} className="object-fit" src={star} />
          </div>
        </div>
        <div>
          <div className="fixed bottom-5 left-8 text-2xl text-white font-bold font-sans bg-lime-600 rounded-md px-7 py-3">
            {name2}
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
