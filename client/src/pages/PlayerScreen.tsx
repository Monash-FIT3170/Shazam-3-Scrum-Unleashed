import { useEffect, useState } from "react";
import DisplayLogo from "../components/DisplayLogo";
import WaitingToStart from "../components/WaitingToStart";
import { socket } from "../App";
import { PlayerAttributes } from "../../../types/types.ts";
import ChoosePlayerMove from "../components/ChoosePlayerMove.tsx";
import { useLoaderData } from "react-router-dom";

// import ChoosePlayerMove from "../components/ChoosePlayerMove";
// import CountDownTimer from "../components/CountDownTimer";
// import WinnerPlayer from "../components/WinnerPlayer";

function getUserPlayer(players: PlayerAttributes[]) {
  for (const player of players) {
    if (player.userID === socket.userID) {
      return player;
    }
  }
  return null;
}

const PlayerScreen = () => {
  const { loadedTournamentCode, loadedPlayerName } = useLoaderData() as {
    loadedTournamentCode: string;
    loadedPlayerName: string;
  };

  const [tournamentCode, setTournamentCode] = useState(loadedTournamentCode);
  const [playerName, setPlayerName] = useState(loadedPlayerName);
  const [players, setPlayers] = useState<PlayerAttributes[]>([]);

  useEffect(() => {
    socket.on("MATCH_STARTED", (players) => {
      setPlayers(players);
      console.log(players);
    });

    socket.on("MATCH_INFO", (players, winnerUserID) => {
      setPlayers(players);
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

  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        <div className=" items-center size-60 w-full">
          <DisplayLogo />
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          {players?.length === 0 ? (
            <WaitingToStart />
          ) : (
            <ChoosePlayerMove tournamentCode={tournamentCode} />
          )}

          {/* <WinnerPlayer />
          <CountDownTimer />

           */}
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
