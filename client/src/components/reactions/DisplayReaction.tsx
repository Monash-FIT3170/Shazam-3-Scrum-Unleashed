import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { type ReactionProperties } from "../../types";

export function DisplayReaction({
  x,
  y,
  value,
  kill,
}: ReactionProperties & { kill: () => void }) {
  const REACTION_LIFETIME_MS = 1000;
  const [reactionSize] = useState((Math.random() + 1)*40);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsRemoved(true);
      setTimeout(kill, REACTION_LIFETIME_MS);
    }, REACTION_LIFETIME_MS);
    return () => clearTimeout(handler);
  }, []);

  return (
    <AnimatePresence>
      {!isRemoved && (
        <motion.span
          exit={{ opacity: 0 }}
          className="absolute opacity-85"
          style={{
            bottom: `${y}%`,
            left: `${x}%`,
            width: `${reactionSize}px`,
          }}
        >
          <img src={value} alt="" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default DisplayReaction;
