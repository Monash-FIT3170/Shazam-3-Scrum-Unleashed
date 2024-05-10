interface PlayerNameProps {
  name: string;
  playerNum: number;
}

const PlayerName = ({name, playerNum}: PlayerNameProps) => {
  if (window.innerHeight <= 800 && window.innerWidth <=500) {
    if (playerNum === 1) {
      return <div className="fixed top-1 right-3 text-2xl text-white font-bold font-sans">
        {name}
      </div>
      }
    else {
      return <div className="flex fixed bottom-1 left-3 text-2xl text-white font-bold font-sans">
        {name}
      </div>}
    }
  else {
    if (playerNum === 1) {
      return <div className="fixed top-5 right-3 text-2xl text-white font-bold font-sans">
        {name}
      </div>
      }
    else {
      return <div className="flex fixed bottom-1 left-3 text-2xl text-white font-bold font-sans">
        {name}
      </div>
    }
  }
}

export default PlayerName;