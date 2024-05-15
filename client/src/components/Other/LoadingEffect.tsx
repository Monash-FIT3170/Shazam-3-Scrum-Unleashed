import loading from "../assets/Loading.svg";

type LoadingEffectProps = {
  isOpponent: boolean;
};

const LoadingEffect = ({ isOpponent }: LoadingEffectProps) => {
  return (
    <div
      className={
        "fixed mx-auto max-w-max inset-x-0 scale-[0.78] md:scale-100" +
        ` ${isOpponent ? "top-[6.5%] md:top-[5%]" : "bottom-[6.5%] md:bottom-[5%]"}`
      }
    >
      <div className="animate-[spin_4s_linear_infinite]">
        <img src={loading} alt={"Loading"} />
      </div>
    </div>
  );
};

export default LoadingEffect;
