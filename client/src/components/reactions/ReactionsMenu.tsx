import ReactionMenuItem from "./ReactionMenuItem";
import { ReactionList} from "./Reaction"
import { useState } from "react";

const ReactionMenu = () => {

  const [selectedReaction, setSelectedReaction] = useState(ReactionList[0]);

// Create a reaction menu item for every reaction in ReactionList
const SelectableReactions = ReactionList.map(
  (reaction) =>
    <div>
      <ReactionMenuItem
        reaction = {reaction}
        isSelected = {reaction.type == selectedReaction.type}
        onSelectReaction = {setSelectedReaction}
      />
    </div>
  );

  return (
  <div className="w-20 flex flex-col gap-2 justify-center items-center rounded-full bg-spectator-bg reaction-menu">
      {SelectableReactions}
      <button
          onClick={() => console.log(Object.keys(ReactionList).length)}
          className= "hover:bg-black/50 w-20 h-20 flex rounded-full reaction-menu-item"
        >
          <img src={selectedReaction.svg} alt={selectedReaction.alt} className="" />
        </button>
      </div>
    );
  };

  export default ReactionMenu;


