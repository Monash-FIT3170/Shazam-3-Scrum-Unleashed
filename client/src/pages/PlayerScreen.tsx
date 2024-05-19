import { useEffect, useState } from "react";
import WaitingToStart from "../components/WaitingToStart";
import { socket } from "../App";
import { PlayerAttributes } from "../../../types/types.ts";
import ChoosePlayerMove from "../components/ChoosePlayerMove.tsx";
import { useLoaderData } from "react-router-dom";
import DuelOutcome from "../components/duel/DuelOutcome.tsx";
import PlayerAndSpectatorsInfo from "../components/PlayerAndSpectatorsInfo.tsx";
import MatchOutcomeScreen from "../components/MatchOutcomeScreen.tsx";
import TournamentWin from "../components/TournamentWin.tsx";

// import ChoosePlayerMove from "../components/ChoosePlayerMove";
// import CountDownTimer from "../components/CountDownTimer";
// import WinnerPlayer from "../components/WinnerPlayer";

const PlayerScreen = () => {
  const { loadedTournamentCode, loadedPlayerName } = useLoaderData() as {
    loadedTournamentCode: string;
    loadedPlayerName: string;
  };

  const [tournamentCode] = useState(loadedTournamentCode);
  const [playerName] = useState(loadedPlayerName);
  const [userPlayer, setUserPlayer] = useState<PlayerAttributes>();
  const [opponent, setOpponent] = useState<PlayerAttributes>();
  const [duelComplete, setDuelComplete] = useState(false);
  const [matchComplete, setMatchComplete] = useState(false);
  const [winnerUserID, setWinnerUserID] = useState<string | undefined>(
    undefined,
  );
  const [tournamentWinner, setTournamentWinner] = useState<
    string | undefined
  >();

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
    });

    socket.on("MATCH_INFO", (players, winnerUserID) => {
      setPlayers(players);
      setDuelComplete(true);

      console.log(winnerUserID, "weewrew");

      if (winnerUserID) {
        setMatchComplete(true);
        setWinnerUserID(winnerUserID);
      }
    });

    socket.on("TOURNAMENT_COMPLETE", (playerName) => {
      setTournamentWinner(playerName);
    });

    return () => {
      // Clean up socket event listener
      socket.off("MATCH_STARTED");
      socket.off("MATCH_INFO");
    };
  }, []);

  let content = null;
  if (userPlayer === undefined || opponent === undefined) {
    content = (
      <WaitingToStart tournamentCode={tournamentCode} playerName={playerName} />
    );
  } else if (duelComplete) {
    content = <DuelOutcome userPlayer={userPlayer} opponent={opponent} />;
    setTimeout(() => {
      setDuelComplete(false);
    }, 3000);
  } else if (matchComplete) {
    content = (
      <MatchOutcomeScreen
        player={userPlayer}
        opponent={opponent}
        isWin={winnerUserID === userPlayer.userID}
      />
    );
    setTimeout(() => {
      setMatchComplete(false);
    }, 4000);
  } else if (tournamentWinner !== undefined) {
    content = <TournamentWin playerName={tournamentWinner} />;
  } else {
    content = <ChoosePlayerMove tournamentCode={tournamentCode} />;
  }

  return (
    <div className="overflow-hidden h-screen relative">
      <div className="pt-12">
        <div className="flex flex-col items-center justify-center mt-10">
          {userPlayer !== undefined && opponent !== undefined && (
            <PlayerAndSpectatorsInfo
              userPlayer={userPlayer}
              opponent={opponent}
            />
          )}
          {content}
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
