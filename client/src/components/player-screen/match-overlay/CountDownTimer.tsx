// Sample count down timer component.
// Not entirely sure how this timer will integrate with the game logic at the moment.

import { useState, useEffect } from "react";
import Timer from "../../../assets/choose-move/Timer.svg";

interface CountDownTimerProps {
  time: number; // in seconds
}

const CountDownTimer = ({ time }: CountDownTimerProps) => {
  const [countdown, setCountdown] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="fixed top-[53%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold flex items-center">
      <img src={Timer} alt="Timer" className="w-10 h-10 mr-4" />
      {formattedTime}
    </div>
  );
};

export default CountDownTimer;
