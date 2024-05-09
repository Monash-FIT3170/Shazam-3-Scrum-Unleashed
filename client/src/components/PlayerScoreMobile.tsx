interface PlayerScoreProps {
  player1Score: number;
  player2Score: number;
  matchResult: string;
}

const result = ({player1Score, player2Score, matchResult}: PlayerScoreProps) => {
  return (
    <div>
      {matchResult === "win" && (
        <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
          <p className="text-8xl text-white font-bold font-sans">YOU WIN</p>
          <div className="flex justify-center">
            <p className="text-6xl text-white font-bold font-sans">{player2Score} - <span className="text-green-600">{player1Score}</span></p>
          </div>
        </div>
      )}
      {matchResult === "lose" && (
        <div style={{position: "fixed", bottom: 150, left: 50, height: 500, width:300}} className="flex flex-col justify-center content-end">
          <p className="text-8xl text-white font-bold font-sans">YOU LOSE</p>
          <div className="flex justify-center">
            <p className="text-6xl text-white font-bold font-sans">{player2Score} - <span className="text-red-700">{player1Score}</span></p>
          </div>
        </div>
      )}
      {matchResult === "tie" && (
        <div style={{position: "fixed", bottom: 150, left: 80, height: 500, width:250}} className="flex flex-col justify-center content-end">
          <p className="text-8xl text-white font-bold font-sans">YOU TIE</p>
          <div className="flex justify-center">
            <p className="text-6xl text-white font-bold font-sans">{player2Score} - <span>{player1Score}</span></p>
        </div>
        </div>
      )}
    </div>
  ) 
}

export default result;