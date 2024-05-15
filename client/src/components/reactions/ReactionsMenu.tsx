import ReactionMenuItem from "./ReactionMenuItem";
import { ReactionList } from ".";
import { useState } from "react";

const ReactionMenu = () => {
  const [selectedReaction, setSelectedReaction] = useState(ReactionList[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Create a reaction menu item for every reaction in ReactionList
  const SelectableReactions = ReactionList.map((reaction) => (
    <div key={reaction.type}>
      <ReactionMenuItem
        reaction={reaction}
        isSelected={reaction.type == selectedReaction.type}
        onClick={(reaction) => {
          setSelectedReaction(reaction);
          setIsMenuOpen(false);
        }}
      />
    </div>
  ));

  return (
    <div className="scale-75 origin-bottom-right md:scale-100 absolute flex flex-col gap-2 justify-center items-center md:right-10 md:bottom-10 right-4 bottom-4 rounded-full bg-spectator-bg reaction-menu">
      {isMenuOpen && SelectableReactions}

      {
        /* Currently Selected Reaction */
        !isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:bg-black/50 w-20 h-20 flex rounded-full reaction-menu-item"
          >
            <img
              src={selectedReaction.svg}
              alt={selectedReaction.alt}
              className=""
            />
          </button>
        )
      }
    </div>
  );
};

export default ReactionMenu;
