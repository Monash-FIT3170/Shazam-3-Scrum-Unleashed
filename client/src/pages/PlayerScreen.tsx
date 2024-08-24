import { useEffect, useState } from "react";
import WaitingForMatchStart from "../components/player-screen/waiting-screens/WaitingForMatchStart.tsx";
import { socket } from "../App";
import { PlayerAttributes } from "../../../types/types.ts";
import { useLoaderData } from "react-router-dom";
import PlayerAndSpectatorsInfo from "../components/player-screen/match-overlay/PlayerAndSpectatorsInfo.tsx";
import MatchOutcomeScreen from "../components/player-screen/outcome-screens/MatchOutcomeScreen.tsx";
import TournamentWin from "../components/player-screen/tournament-win/TournamentWin.tsx";
import ReactionOverlay from "../components/reactions/ReactionsOverlay.tsx";
import { Pong } from "../components/pong/Pong.tsx";
import { MatchType } from "../../../types/socket/eventArguments.ts";
import { RPS } from "../components/rps/RPS.tsx";
import DuelInProgressAnimation from "../components/player-screen/DuelInProgressAnimation.tsx";

const PlayerScreen = () => {
  const { loadedTournamentCode, loadedPlayerName } = useLoaderData() as {
    loadedTournamentCode: string;
    loadedPlayerName: string;
  };

  const MATCH_COMPLETION_TIME = 4000;
  const [tournamentCode] = useState(loadedTournamentCode);
  const [playerName] = useState(loadedPlayerName);
  const [userPlayer, setUserPlayer] = useState<PlayerAttributes>();
  const [opponent, setOpponent] = useState<PlayerAttributes>();
  const [matchWinnerID, setMatchWinnerID] = useState<string>();
  const [tournamentWinner, setTournamentWinner] = useState<string>();
  const [isSpectator, setIsSpectator] = useState(false);
  const [matchType, setMatchType] = useState<MatchType>();
  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const storedMatchState = localStorage.getItem("matchStarted");
    if (storedMatchState === "true") {
      setIsAnimationComplete(true);
    }

    socket.on("MATCH_START", (players, matchType) => {
      setPlayers(players);
      setMatchType(matchType);
      setIsSpectator(getIsSpectator(players));
      localStorage.setItem("matchStarted", "true"); // Store match started state
    });

    socket.on("MATCH_DATA", (players, winnerUserID) => {
      setMatchWinnerID(winnerUserID);
      setPlayers(players);
    });

    socket.on("TOURNAMENT_COMPLETE", (playerName) => {
      setTournamentWinner(playerName);
      localStorage.removeItem("matchStarted");
    });

    return () => {
      socket.off("MATCH_START");
      socket.off("MATCH_DATA");
      socket.off("TOURNAMENT_COMPLETE");
    };
  }, []);

  function setPlayers(players: PlayerAttributes[]) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.userID === socket.userID) {
        setIsPlayerOne(i + 1 === 1);
      }

      setIsPlayerOne(players[0].userID === socket.userID);
      let canSetPlayer = true;
      for (const spectatingID of player.spectatorIDs) {
        if (socket.userID === spectatingID) {
          setIsPlayerOne(i + 1 === 1);
          setUserPlayer(player);
          canSetPlayer = false;
          break;
        }
      }

      if (canSetPlayer) {
        if (player.userID === socket.userID) {
          setUserPlayer(player);
        } else {
          setOpponent(player);
        }
      }
    }
  }

  function getIsSpectator(players: PlayerAttributes[]) {
    for (const player of players) {
      if (player.userID === socket.userID) {
        return false;
      }
    }
    return true;
  }

  let content = null;

  // If the tournament has completed, show the winner screen
  if (tournamentWinner !== undefined) {
    content = <TournamentWin playerName={tournamentWinner} />;
  }
  // If the user player or opponent are not defined, wait for match to start
  else if (userPlayer === undefined || opponent === undefined) {
    content = (
      <WaitingForMatchStart
        tournamentCode={tournamentCode}
        playerName={playerName}
      />
    );
  }
  // If the match has a winner, show the match outcome screen
  else if (matchWinnerID != undefined) {
    content = (
      <MatchOutcomeScreen
        player={userPlayer}
        opponent={opponent}
        isWin={matchWinnerID === userPlayer.userID}
      />
    );
    setTimeout(() => {
      setMatchWinnerID(undefined);
      setOpponent(undefined);
    }, MATCH_COMPLETION_TIME);
  }
  // Otherwise, show the animation or the match content
  else if (isAnimationComplete) {
    switch (matchType) {
      case "PONG": {
        content = (
          <Pong tournamentCode={tournamentCode} isPlayerOne={isPlayerOne} />
        );
        break;
      }
      case "RPS": {
        content = (
          <RPS
            tournamentCode={tournamentCode}
            player={userPlayer}
            opponent={opponent}
            isPlayerOne={isPlayerOne}
          />
        );
        break;
      }
    }
  } else {
    // Show animation
    content = <DuelInProgressAnimation />;
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 3000);
  }

  return (
    <>
      <ReactionOverlay
        gameCode={tournamentCode}
        spectatingID={isSpectator ? userPlayer!.userID : null}
      />
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
    </>
  );
};

export default PlayerScreen;
