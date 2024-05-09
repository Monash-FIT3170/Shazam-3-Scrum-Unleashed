interface SemiCircleProps {
  variant: string;
  text?: string;
  angle: string;
}

const SemiCircle3dots = ({ variant, text, angle }: SemiCircleProps) => {
  return (
    <div
      className={`flex justify-center items-center h-36 w-60 bg-indigo-500 rounded-tl-full rounded-tr-full transform rotate-${angle}`}
    >
      {variant === "dots" && (
        <div>
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full"></div>
        </div>
      )}

      {variant === "text" && text !== undefined && (
        <div
          className="text-white font-bold transform rotate-180 text-3xl uppercase"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default SemiCircle3dots;