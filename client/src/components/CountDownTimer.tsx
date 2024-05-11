// Sample count down timer component.
// Not entirely sure how this timer will integrate with the game logic at the moment.

import { useState, useEffect } from "react";
import Timer from "../assets/ChooseMove/Timer.svg";

const CountDownTimer = () => {
  const [countdown, setCountdown] = useState(10);

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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-5xl font-bold flex items-center">
      <img src={Timer} alt="Timer" className="w-10 h-10 mr-4" />
      {formattedTime}
    </div>
  );
};

export default CountDownTimer;
