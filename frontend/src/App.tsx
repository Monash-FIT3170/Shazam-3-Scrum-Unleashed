import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gameSessionManager } from "./classes/gameSessionManager.ts";
import  Player  from "./classes/player.ts";

function App() {
  const [count, setCount] = useState(0);
  const player1 = new Player("1", 1, false);
  const player2 = new Player("2", 2, false);

  const gameSession = new gameSessionManager(player1 ,player2 )

  gameSession.playRound("rock","paper")
  gameSession.playRound("paper","scissors");

  console.log(player1);
  console.log(player2);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
