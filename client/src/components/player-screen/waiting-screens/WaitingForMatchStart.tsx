import { useState } from "react";
import DisplayLogo from "../../DisplayLogo.tsx";
import LoadingEffect from "./LoadingEffect.tsx";
import TutorialPopup from "../../popups/TutorialPopup.tsx";

type WaitingToStartProps = {
  playerName: string;
  tournamentCode: string;
};

const WaitingForMatchStart = ({
  playerName,
  tournamentCode,
}: WaitingToStartProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const showTutorial = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div>
        <button
          className="fixed bg-primary hover:bg-primary-light-dark text-white font-bold rounded-full border-4 border-white text-4xl w-16 h-16 sm:w-20 sm:h-20 sm:text-6xl top-5 right-5 z-10"
          onClick={showTutorial}
        >
          ?
        </button>
      </div>

      <TutorialPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
      ></TutorialPopup>

      <LoadingEffect isOpponent={false} />
      <div className="flex flex-col items-center justify-center">
        <div className=" items-center size-60 w-full">
          <DisplayLogo />
        </div>
        <h1 className="text-white md:text-5xl text-4xl py-5 font-bold flex items-center justify-center">
          WAITING FOR MATCH...
        </h1>

        <div className="fixed bottom-8 md:left-20 left-5">
          <p className="text-white md:text-lg text-sm font-bold mb-2">
            YOUR NICKNAME:
          </p>
          <p className="text-white md:text-3xl font-bold">{playerName}</p>
        </div>

        <div className="fixed bottom-8 md:right-20 right-5">
          <p className="text-white md:text-lg text-sm font-bold mb-2">
            TOURNAMENT CODE:
          </p>
          <p className="text-white md:text-3xl font-bold">{tournamentCode}</p>
        </div>
      </div>
    </>
  );
};

export default WaitingForMatchStart;
