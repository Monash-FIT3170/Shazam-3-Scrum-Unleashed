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
  }

  return (
    <>
      {/*      <div className="fixed top-0 md:right-20 ">
        <ButtonComponent linkPath="/" text={"Quit Tournament"} />
      </div>*/}
      
      {/*Tutorial Button */}
        <div>
          {/*dunno why its gotta be absolute to be pressable but it works
            suspect its the reaction screen not allowing it */}
          <button 
            className="absolute bg-primary hover:bg-primary text-white font-bold rounded-xl border-4 border-white text-2xl w-80 md:w-48 lg:w-56 py-2 px-4 top-5 inset-x-0 mx-auto z-10"
            onClick={showTutorial}>
            HOW TO PLAY
          </button>
        </div>

        <TutorialPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
        ></TutorialPopup>

      <div className=" items-center size-60 w-full">
        <DisplayLogo />
      </div>

      <LoadingEffect isOpponent={false} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white md:text-5xl text-4xl font-bold absolute inset-0 flex items-center justify-center">
          WAITING FOR MATCH...
        </h1>

        <div className="fixed bottom-10 md:left-20 left-5">
          <p className="text-white md:text-lg text-sm font-bold mb-2">
            YOUR NICKNAME:
          </p>
          <p className="text-white md:text-3xl font-bold">{playerName}</p>
        </div>

        <div className="fixed bottom-10 md:right-20 right-5">
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
