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
  const [reactionSize] = useState((Math.random() + 1) * 40);
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
          className="absolute opacity-60 select-none -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${y}%`,
            left: `${x}%`,
            width: `${reactionSize}px`,
          }}
        >
          <img src={value} alt="Reaction" className="pointer-events-none" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default DisplayReaction;
