import DisplayLogo from "../components/DisplayLogo";
import WaitingToStart from "../components/WaitingToStart";
//import ChoosePlayerMove from "../components/ChoosePlayerMove";
//import CountDownTimer from "../components/CountDownTimer";

const PlayerScreen = () => {
  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        <div className=" items-center size-60 w-full">
          <DisplayLogo />
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="mt-20">
            <WaitingToStart />
          </div>
          {/* <div className="mt-20">
          <CountDownTimer />
          <ChoosePlayerMove />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
