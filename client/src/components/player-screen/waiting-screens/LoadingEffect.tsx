import loading from "../../../assets/misc/Loading.svg";

type LoadingEffectProps = {
  isOpponent: boolean;
};

// fixme, component is can only be placed in two spots, however these will not always be free
//  probably just get rid of the positioning in here and allow the calling component to manage that.
const LoadingEffect = ({ isOpponent }: LoadingEffectProps) => {
  return (
    <div
      className={
        "fixed mx-auto max-w-max inset-x-0 scale-[0.78] md:scale-100 pointer-events-none select-none" +
        ` ${isOpponent ? "top-[6.5%] md:top-[5.5%]" : "bottom-[9.5%] md:bottom-[5%]"}`
      }
    >
      <div className="animate-[spin_4s_linear_infinite]">
        <img src={loading} alt={"Loading"} />
      </div>
    </div>
  );
};

export default LoadingEffect;
