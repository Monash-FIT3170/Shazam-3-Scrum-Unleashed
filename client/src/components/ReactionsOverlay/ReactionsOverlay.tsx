import Reaction from "./Reaction.tsx";

interface ReactionOverlayProps {
  reactions: { x: number; y: number; value: string }[];
}

function ReactionOverlay({ reactions }: ReactionOverlayProps) {
  return (
    <div className="w-screen h-screen top-0 left-0 fixed z-50">
      {reactions.map(({ x, y, value }) => (
        <Reaction x={x} y={y} value={value} key={`${value}-${x}-${y}}`} />
      ))}
    </div>
  );
}

export default ReactionOverlay;
