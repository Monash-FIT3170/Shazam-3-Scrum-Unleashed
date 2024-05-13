import Reaction from "./Reaction.tsx";
import { useEffect, useRef, useState } from "react";

function ReactionOverlay() {
  const [reactions, setReactions] = useState<
    Record<string, { isAlive: boolean; x: number; y: number; value: string }>
  >({});

  const reactionsRef = useRef(reactions);

  // Test reaction overlay
  const availableEmojis = ["🎉", "💀", "😂", "❤️", "🐐"];

  useEffect(() => {
    // Clean up object when reactions have passed their lifetime
    const handle = setInterval(() => {
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
    <div
      className="w-screen h-screen top-0 left-0 fixed z-50"
      onClick={(e) => {
        console.log(e.clientX, e.clientY);
        const reaction = {
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
          value:
            availableEmojis[Math.floor(Math.random() * availableEmojis.length)],
        };
        reactionsRef.current = {
          ...reactionsRef.current,
          // replace this with unique id generated from backend
          [`${reaction.value}-${reaction.x}-${reaction.y}}`]: {
            isAlive: true,
            ...reaction,
          },
        };
        setReactions(reactionsRef.current);
      }}
    >
      {Object.entries(reactions).map(([key, { x, y, value }]) => (
        <Reaction
          x={x}
          y={y}
          value={value}
          key={key}
          kill={() => (reactionsRef.current[key].isAlive = false)}
        />
      ))}
    </div>
  );
}

export default ReactionOverlay;
