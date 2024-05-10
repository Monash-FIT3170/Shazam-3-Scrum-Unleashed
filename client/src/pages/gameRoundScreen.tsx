import { useEffect, useState } from "react";
import ReactionOverlay from "../components/ReactionsOverlay/ReactionsOverlay";
import SemiCircle3dots from "../components/semiCircle3dots";
const GameRoundScreen = () => {
  const [reactions, setReactions] = useState<
    { x: number; y: number; value: string }[]
  >([]);

  const availableEmojis = ["🎉", "💀", "😂", "❤️"];
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
    <>
      <ReactionOverlay reactions={reactions} />
      <div className="flex justify-center items-start">
        <div>
          <SemiCircle3dots variant="text" text="make your move" angle="180" />
          <h1 className="text-white"> TIMES RUNNING OUT!</h1>
        </div>

        {/*<h1 className="text-white font-bold mt-6 uppercase"> Game Code : {gameCode}</h1>*/}
      </div>
    </>
  );
};

export default GameRoundScreen;
