import Timer from "../../../assets/choose-move/Timer.svg";

type duelTimerProps = {
  time: number;
};

const DuelTimer = ({ time }: duelTimerProps) => {
  return (
    // <div className="fixed text-white font-bold px-8 rounded-2xl">
    //   <h2 className="sm:text-xl md:text-2xl">Timer: {time}</h2>
    // </div>
    <div
      className="fixed left-1/16 transform -translate-y-1/2 text-white text-4xl font-bold flex items-center"
      style={{ top: "65%" }}
    >
      <img src={Timer} alt="Timer" className="w-10 h-10 mr-4" />
      {time}
    </div>
  );
};

export default DuelTimer;
