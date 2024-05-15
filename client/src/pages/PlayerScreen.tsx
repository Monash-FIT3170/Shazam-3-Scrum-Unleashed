import DisplayLogo from "../components/Other/DisplayLogo";
//import WaitingToStart from "../components/WaitingToStart";
import ChoosePlayerMove from "../components/Move/ChoosePlayerMove";
import CountDownTimer from "../components/Other/CountDownTimer";

const PlayerScreen = () => {
  return (
    <div className="overflow-hidden">
      <div className="pt-12">
        <DisplayLogo />
        {/* <div className="flex flex-col items-center justify-center mt-16"> */}
        {/* <div className="mt-20">
            <WaitingToStart />
          </div> */}
        <div className="mt-20">
          <CountDownTimer />
          <ChoosePlayerMove />
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
