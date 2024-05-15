import { ReactionType } from "../../../../types/types";
import { Reaction } from "./Reaction";
import React from "react";


interface ReactionSelectionProps {
  reaction: Reaction,
  isSelected: boolean,
  onSelectReaction: (reactionType: Reaction) => void;
}

const ReactionMenuItem: React.FC<ReactionSelectionProps> = ({
  reaction,
  isSelected,
  onSelectReaction,
}) => {
    return (
        <button
          onClick={() => onSelectReaction(reaction)}
          className= {`hover:bg-black/50 w-20 h-20 flex rounded-full reaction-menu-item ${isSelected ? "outline outline-4 outline-white bg-black/50" : ""}`}
        >
          <img src={reaction.svg} alt={reaction.alt} className="" />
        </button>
      );
    };

  export default ReactionMenuItem;

