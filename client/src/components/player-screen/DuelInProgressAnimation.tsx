// import { useEffect, useState } from "react";
import shazamText from "../../../src/assets/logo/ShazamText.svg";
import hand from "../../../src/assets/misc/YellowHand.svg";
import explosion from "../../../src/assets/misc/Explosion.svg";

function DuelInProgressAnimation() {
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //     setTimeout(() => {
  //         setLoaded(true);
  //     }, 10);

  //     return () => setLoaded(false);
  // }, []);

  // see tailwind.config.ts for animation keyframes
  return (
    <div className="flex">

      <div className="z-0 animate-textanim [--textanim-delay:100ms] opacity-0 text-[#E943E9] text-[55px] sm:text-[130px] lg:text-[150px] font-bold absolute inset-0 flex items-center justify-center">
        <p>ROCK</p>
      </div>
      <div className="z-0 animate-textanim [--textanim-delay:1s] opacity-0 text-[#65DBBB] text-[55px] sm:text-[130px] lg:text-[150px] font-bold absolute inset-0 flex items-center justify-center">
        <p>PAPER</p>
      </div>
      <div className="z-0 animate-shazamanim2 sm:animate-shazamanim [--shazamanim-delay:1.9s] opacity-0 absolute inset-0 flex items-center justify-center">
        <img src={shazamText} alt={"Shazam"} />
      </div>

      <div className="z-10 animate-translateinbottom [--translateinbottom-delay:1.9s] opacity-0 mx-auto max-w-max inset-x-0 scale-75 md:scale-95 fixed translate-y-full">
        <img src={hand} alt={"Hand punching in"} />
      </div>
      <div className="z-10 animate-translateintop [--translateintop-delay:1.9s] opacity-0 mx-auto max-w-max inset-x-0 scale-75 md:scale-95 fixed rotate-180 -translate-y-full">
        <img src={hand} alt={"Hand punching in"} />
      </div>

      <div className="z-20 animate-explosionanim [--explosionanim-delay:2.35s] opacity-0 text-white text-[130px] font-bold absolute inset-0 flex items-center justify-center">
        <img src={explosion} alt={"Explosion"} />
      </div>
    </div>
  );
}

export default DuelInProgressAnimation;
