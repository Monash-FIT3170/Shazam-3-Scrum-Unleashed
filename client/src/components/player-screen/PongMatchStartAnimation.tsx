import pongTextP from "../../../src/assets/logo/PongTextP.svg";
import pongTextO from "../../../src/assets/logo/PongTextO.svg";
import pongTextNG from "../../../src/assets/logo/PongTextNG.svg";
import { useEffect, useState } from "react";

function PongMatchStartAnimation() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 10);

    return () => setLoaded(false);
  }, []);

  return (
    <div className="flex">
      <div className="absolute inset-0 flex items-center justify-center scale-75">
        <div
          className={
            "duration-[700ms] ease-out transition-all" +
            ` ${loaded ? "-mt-0" : "-mt-[6000px]"}`
          }
        >
          <img src={pongTextP} alt={"P"} />
        </div>
        <div
          className={
            "ml-4 mr-4 delay-[780ms] duration-[300ms] ease-out transition-all" +
            ` ${loaded ? "scale-100 opacity-100" : "scale-[140] opacity-0"}`
          }
        >
          <img src={pongTextO} alt={"O"} />
        </div>
        <div
          className={
            "duration-[700ms] ease-out transition-all" +
            ` ${loaded ? "-mb-0" : "-mb-[6000px]"}`
          }
        >
          <img src={pongTextNG} alt={"N G"} />
        </div>
      </div>
    </div>
  );
}

export default PongMatchStartAnimation;
