import DisplayReaction from "./DisplayReaction.tsx";
import { useEffect, useRef, useState } from "react";
import ReactionMenu from "./ReactionsMenu.tsx";
import { ReactionList } from "./Reaction.tsx";

function ReactionOverlay() {
  const [reactions, setReactions] = useState<
    Record<string, { isAlive: boolean; x: number; y: number; value: string }>
  >({});

  const reactionsRef = useRef(reactions);

  // Test reaction overlay
  // ReactionList.map((reaction) => reaction.svg);
  const availableEmojis = ReactionList.map((reaction) => reaction.svg);
  const reactionPlaceholders = [...Array(100)].map(() => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      value:
        availableEmojis[Math.floor(Math.random() * availableEmojis.length)],
    };
  });

  useEffect(() => {
    let reactionCounter = 0;
    const handle = setInterval(() => {
      reactionCounter++;
      const { x, y, value } = reactionPlaceholders[reactionCounter];
      reactionsRef.current = {
        ...reactionsRef.current,
        [`${value}-${x}-${y}}`]: {
          isAlive: true,
          x,
          y,
          value,
        },
      };
      setReactions(reactionsRef.current);

      if (reactionCounter === reactionPlaceholders.length - 1) {
        reactionCounter = 0;
      }
    }, Math.random() * 500);

    // Clean up object when reactions have passed their lifetime
    setInterval(() => {
      for (const key in reactionsRef.current) {
        if (!reactionsRef.current[key].isAlive) {
          delete reactionsRef.current[key];
        }
      }
      setReactions(reactionsRef.current);
    }, 5000);

    return () => {
      setReactions({});
      clearInterval(handle);
    };
  }, []);

  return (
    <div>      <ReactionMenu></ReactionMenu>
    <div className="w-screen h-screen top-0 left-0 fixed z-50 pointer-events-none">
      {Object.entries(reactions).map(([key, { x, y, value }]) => (
        <DisplayReaction
          x={x}
          y={y}
          value={value}
          key={key}
          kill={() => (reactionsRef.current[key].isAlive = false)}
        />
      ))}
    </div>
    </div>
  );
}

export default ReactionOverlay;
