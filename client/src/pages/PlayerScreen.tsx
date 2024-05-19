import { useEffect, useState } from "react";
import WaitingToStart from "../components/WaitingToStart";
import { socket } from "../App";
import { PlayerAttributes } from "../../../types/types.ts";
import ChoosePlayerMove from "../components/ChoosePlayerMove.tsx";
import { useLoaderData } from "react-router-dom";
import DuelMove from "../components/DuelMove.tsx";

// import ChoosePlayerMove from "../components/ChoosePlayerMove";
// import CountDownTimer from "../components/CountDownTimer";
// import WinnerPlayer from "../components/WinnerPlayer";

const PlayerScreen = () => {
  const { loadedTournamentCode } = useLoaderData() as {
    loadedTournamentCode: string;
    loadedPlayerName: string;
  };

  const [tournamentCode] = useState(loadedTournamentCode);
  // const [playerName, setPlayerName] = useState(loadedPlayerName);
  const [userPlayer, setUserPlayer] = useState<PlayerAttributes>();
  const [opponent, setOpponent] = useState<PlayerAttributes>();
  const [duelComplete, setDuelComplete] = useState(false);

  function setPlayers(players: PlayerAttributes[]) {
    for (const player of players) {
      if (player.userID === socket.userID) {
        setUserPlayer(player);
      } else {
        setOpponent(player);
      }
    }
  }

  useEffect(() => {
    socket.on("MATCH_STARTED", (players) => {
      setPlayers(players);
      console.log(players);
    });

    socket.on("MATCH_INFO", (players, winnerUserID) => {
      setPlayers(players);
      setDuelComplete(true);

      console.log(players, "Winner: ", winnerUserID);
      // Move to duel animation screen

      if (winnerUserID) {
        // show trophy or x after, duel animation.
      }
    });

    return () => {
      // Clean up socket event listener
      socket.off("MATCH_STARTED");
      socket.off("MATCH_INFO");
    };
  }, []);

  let content = null;
  if (userPlayer === undefined || opponent === undefined) {
    content = <WaitingToStart />;
  } else if (duelComplete) {
    content = (
      <DuelMove
        move={userPlayer.actionChoice ?? "ROCK"}
        result={"win"}
        score1={userPlayer.score}
        score2={opponent.score}
      />
    );
    setTimeout(() => {
      setDuelComplete(false);
    }, 5000);
  } else {
    content = <ChoosePlayerMove tournamentCode={tournamentCode} />;
  }

  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        <div className="flex flex-col items-center justify-center mt-10">
          {content}
          {/* <WinnerPlayer />
          <CountDownTimer />

           */}
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
