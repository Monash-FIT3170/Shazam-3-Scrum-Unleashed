interface PlayerMoveProps {
  type: string;
  actor: string;
}

const PlayerMoveMobile = ({type, actor}: PlayerMoveProps) => {
  return (
    <div>
      {actor === "player"}
    </div>
  )
}

export default PlayerMoveMobile