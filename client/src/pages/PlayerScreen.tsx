import ChoosePlayerMove from "../components/ChoosePlayerMove";
import CountDownTimer from "../components/CountDownTimer";
import DisplayLogo from "../components/DisplayLogo";




const PlayerScreen = () => {
  return (
    <div className="overflow-hidden pt-12">
      <DisplayLogo />
      <CountDownTimer />
      <div className="mt-5">
        <ChoosePlayerMove />
      </div>
    </div>
  );
};

export default PlayerScreen;
