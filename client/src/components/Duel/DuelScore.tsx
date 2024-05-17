import { Result } from "../../types";

interface Props {
  score1: number;
  score2: number;
  result: Result;
}

const MobileScore = ({ score1, score2, result }: Props) => {
  let colorCondition = "";
  if (result === "WIN") {
    colorCondition = "text-green-600";
  } else if (result === "LOSE") {
    colorCondition = "text-red-600";
  } else {
    colorCondition = "text-white";
  }
  return (
    <div style={{ position: "fixed" }} className="flex h-screen w-screen">
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <p className="text-7xl text-white font-bold font-sans">YOU {result}</p>
        <p className="text-7xl text-white font-bold font-sans">
          {score2} - <span className={colorCondition}>{score1}</span>
        </p>
      </div>
    </div>
  );
};

const LaptopScore = ({ score1, score2, result }: Props) => {
  let colorCondition = "";
  if (result === "WIN") {
    colorCondition = "text-green-600";
  } else if (result === "LOSE") {
    colorCondition = "text-red-600";
  } else {
    colorCondition = "text-white";
  }
  return (
    <div
      style={{ position: "fixed", left: 0 }}
      className="flex h-screen w-screen mt-0"
    >
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <p className="text-8xl text-white font-bold font-sans">YOU {result}</p>
        <p className="text-6xl text-white font-bold font-sans">
          {score2} - <span className={colorCondition}>{score1}</span>
        </p>
      </div>
    </div>
  );
};

const DuelScore = ({ score1, score2, result }: Props) => {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    return <MobileScore score1={score1} score2={score2} result={result} />;
  } else {
    return <LaptopScore score1={score1} score2={score2} result={result} />;
  }
};

export default DuelScore;
