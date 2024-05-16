import { Reaction } from ".";
import React from "react";

interface ReactionSelectionProps {
  reaction: Reaction;
  isSelected: boolean;
  onClick: (reactionType: Reaction) => void;
}

const ReactionMenuItem: React.FC<ReactionSelectionProps> = ({
  reaction,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(reaction)}
      className={`hover:bg-black/50 w-20 h-20 flex rounded-full reaction-menu-item justify-center items-center ${isSelected ? "outline outline-4 outline-white bg-black/50" : ""}`}
    >
      <img src={reaction.svg} alt={reaction.alt} />
    </button>
  );
};

export default ReactionMenuItem;
