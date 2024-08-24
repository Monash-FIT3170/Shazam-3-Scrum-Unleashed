import React, { useState } from "react";
import ChooseRPSWhite from "../../assets/gamesetup/ChooseRPSWhite.svg";
import ChoosePongWhite from "../../assets/gamesetup/ChoosePongWhite.svg";
import ChooseMashupWhite from "../../assets/gamesetup/ChooseMashupWhite.svg";
import ChooseRPSBlue from "../../assets/gamesetup/ChooseRPSBlue.svg";
import ChoosePongBlue from "../../assets/gamesetup/ChoosePongBlue.svg";
import ChooseMashupBlue from "../../assets/gamesetup/ChooseMashupBlue.svg";
import { MatchType } from "../../../../types/socket/eventArguments.ts";

interface ChooseMatchTypeProps {
  setMatchType: (matchType: MatchType) => void;
}

const ChooseMatchType: React.FC<ChooseMatchTypeProps> = ({ setMatchType }) => {
  const [selectedType, setSelectedType] = useState<MatchType | null>(null);

  const handleClick = (type: MatchType) => {
    setMatchType(type);
    setSelectedType(type);
    console.log(type);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-48">
      <img
        src={selectedType === "RPS" ? ChooseRPSBlue : ChooseRPSWhite}
        alt="Choose RPS"
        className="w-2/12 cursor-pointer"
        onClick={() => handleClick("RPS")}
      />
      <img
        src={selectedType === "PONG" ? ChoosePongBlue : ChoosePongWhite}
        alt="Choose Pong"
        className="w-2/12 cursor-pointer"
        onClick={() => handleClick("PONG")}
      />
      <img
        src={selectedType === "MASHUP" ? ChooseMashupBlue : ChooseMashupWhite}
        alt="Choose Mashup"
        className="w-2/12 cursor-pointer"
        onClick={() => handleClick("MASHUP")}
      />
    </div>
  );
};

export default ChooseMatchType;
