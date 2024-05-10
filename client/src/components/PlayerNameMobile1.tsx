interface PlayerNameProps {
  name: string;
  playerNum: number;
}

const PlayerName = ({name, playerNum}: PlayerNameProps) => {
  return (
    <div>
      {playerNum === 1 && (
        <div className="fixed top-1 right-3 text-2xl text-white font-bold font-sans">
          {name}
        </div>)}
      {playerNum === 2 && (
        <div className="flex fixed bottom-1 left-3 text-2xl text-white font-bold font-sans">
          {name}
        </div>
      )}
    </div>
  )
}

export default PlayerName;