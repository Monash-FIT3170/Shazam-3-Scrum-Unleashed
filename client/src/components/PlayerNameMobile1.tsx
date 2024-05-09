interface PlayerNameProps {
  name: string;
}

const PlayerName1 = ({name}: PlayerNameProps) => {
  return (
    <div className="fixed top-1 right-3 text-2xl text-white font-bold font-sans">
      {name}
    </div>
  )
}

export default PlayerName1;