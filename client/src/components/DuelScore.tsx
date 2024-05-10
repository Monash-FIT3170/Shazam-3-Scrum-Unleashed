interface ScoreProps {
  player1Score: number;
  player2Score: number;
  matchPhrase: string;
}

interface PlayerScoreProps {
  player1Score: number;
  player2Score: number;
  matchResult: string;
}
 
function ResultFormat({player1Score, player2Score, matchPhrase}: ScoreProps) {
  if (window.innerHeight <= 800 && window.innerWidth <= 500) {
    return <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
      <p className="text-8xl text-white font-bold font-sans">{matchPhrase}</p>
      <div className="flex justify-center">
        <p className="text-6xl text-white font-bold font-sans">{player2Score} - <span className="text-green-600">{player1Score}</span></p>
      </div>
    </div>
  }
  else {
    return <div style={{position: "fixed", bottom: 165, left: 575, height: 500, width:700}} className="flex flex-col justify-center content-end">
      <p className="text-8xl text-white font-bold font-sans">{matchPhrase}</p>
      <div className="flex justify-center">
        <p className="text-6xl text-white font-bold font-sans">{player2Score} - <span className="text-green-600">{player1Score}</span></p>
      </div>
    </div>
  }
  
}

const result = ({player1Score, player2Score, matchResult}: PlayerScoreProps) => {
  return (
    <div>
      {matchResult === "win" && (
        <ResultFormat player1Score={player1Score} player2Score={player2Score} matchPhrase="YOU WIN"/>
      )}
      {matchResult === "lose" && (
        <ResultFormat player1Score={player1Score} player2Score={player2Score} matchPhrase="YOU LOSE"/>
      )}
      {matchResult === "tie" && (
        <ResultFormat player1Score={player1Score} player2Score={player2Score} matchPhrase="IT'S A TIE"/>
      )}
    </div>
  ) 
}

export default result;