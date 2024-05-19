import ReactionMenuItem from "./ReactionMenuItem";
import { Reaction, ReactionList } from ".";
import { useState } from "react";

interface ReactionMenuProps {
  selectedReaction: Reaction;
  setSelectedReaction: (reaction: Reaction) => void;
}

const ReactionMenu = ({
  selectedReaction,
  setSelectedReaction,
}: ReactionMenuProps) => {
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
    <div
      className=" outline outline-8 outline-white origin-bottom-right md:scale-100 scale-75 absolute flex flex-col gap-2 justify-center items-center md:right-10 md:bottom-32 right-4 bottom-20 rounded-full bg-spectator-bg reaction-menu"
      onClick={(e) => e.stopPropagation()}
    >
      {isMenuOpen && SelectableReactions}

      {
        /* Currently Selected Reaction */
        !isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:bg-black/50 w-20 h-20 flex rounded-full reaction-menu-item justify-center items-center"
          >
            <img src={selectedReaction.svg} alt={selectedReaction.alt} />
          </button>
        )
      }
    </div>
  );
};

export default ReactionMenu;
