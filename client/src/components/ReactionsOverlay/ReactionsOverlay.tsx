import Reaction from "./Reaction.tsx";
import { type ReactionProperties } from "../../types";
import { useEffect, useState } from "react";

function ReactionOverlay() {
  const [reactions, setReactions] = useState<ReactionProperties[]>([]);

  // Test reaction overlay
  const availableEmojis = ["🎉", "💀", "😂", "❤️", "🐐"];
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
      setReactions((reactions) => [
        ...reactions,
        reactionPlaceholders[reactionCounter],
      ]);
      if (reactionCounter === reactionPlaceholders.length - 1) {
        reactionCounter = 0;
      }
    }, Math.random() * 500);

    return () => {
      setReactions([]);
      clearInterval(handle);
    };
  }, []);

  return (
    <div className="w-screen h-screen top-0 left-0 fixed z-50">
      {reactions.map(({ x, y, value }) => (
        <Reaction x={x} y={y} value={value} key={`${value}-${x}-${y}}`} />
      ))}
    </div>
  );
}

export default ReactionOverlay;
