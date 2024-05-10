import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { type ReactionProperties } from "../../types";

export function Reaction({ x, y, value }: ReactionProperties) {
  const REACTION_LIFETIME_MS = 1000;
  const [reactionSize] = useState(Math.random() + 2);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setIsRemoved(true), REACTION_LIFETIME_MS);
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
            fontSize: `${reactionSize}rem`,
          }}
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default Reaction;
