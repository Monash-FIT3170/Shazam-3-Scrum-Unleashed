interface PlayerNameProps {
  name: string;
}

const PlayerName2 = ({name}: PlayerNameProps) => {
  return (
    <div className="fixed bottom-1 left-3 text-2xl text-white font-bold font-sans">
      {name}
    </div>
  )
}

export default PlayerName2;