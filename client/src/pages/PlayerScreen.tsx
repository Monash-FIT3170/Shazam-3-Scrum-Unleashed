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

const DEFAULT_DUEL_TIME = 15; // seconds

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
  const [duelTime, setDuelTime] = useState(DEFAULT_DUEL_TIME);
  const [showAnimation, setShowAnimation] = useState(false);

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

  useEffect(() => {
    socket.on("MATCH_START", (players, matchType, duelTime) => {
      setPlayers(players);
      setMatchType(matchType);
      setIsSpectator(getIsSpectator(players));
      setDuelTime(duelTime);

      if (matchType === "RPS") {
        // Only have RPS animation atm, dont show for PONG
        setShowAnimation(true);
      }
    });

    socket.on("MATCH_DATA", (players, winnerUserID) => {
      setPlayers(players);
      setTimeout(()=>{setMatchWinnerID(winnerUserID);}, 1500); // to delay match outcome screen
    });

    socket.on("TOURNAMENT_COMPLETE", (playerName) => {
      setTournamentWinner(playerName);
    });

    return () => {
      socket.off("MATCH_START");
      socket.off("MATCH_DATA");
      socket.off("TOURNAMENT_COMPLETE");
    };
  }, []);

  let content = null;
  // FIXME would like to make this simpler
  if (tournamentWinner !== undefined) {
    content = <TournamentWin playerName={tournamentWinner} />;
  } else if (userPlayer === undefined || opponent === undefined) {
    content = (
      <WaitingForMatchStart
        tournamentCode={tournamentCode}
        playerName={playerName}
      />
    );
  } else if (matchWinnerID != undefined) {
    content = (
      <MatchOutcomeScreen
        player={userPlayer}
        opponent={opponent}
        isWin={matchWinnerID === userPlayer.userID}
        isSpectator={isSpectator}
      />
    );
    setTimeout(() => {
      setMatchWinnerID(undefined);
      setOpponent(undefined);
    }, MATCH_COMPLETION_TIME);
  } else if (!showAnimation) {
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
            isSpectator={isSpectator}
            duelTime={duelTime}
          />
        );
        break;
      }
    }
  } else {
    // Show animation
    content = <DuelInProgressAnimation />;
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
  }

  return (
    <>
      {
        <ReactionOverlay
          gameCode={tournamentCode}
          spectatingID={isSpectator ? userPlayer!.userID : null}
        />
      }
      <div
        className={`overflow-hidden h-screen relative ${
          isSpectator ? "border-8 border-spectator-bg" : ""
        }`}
      >
        <div className="pt-12">
          <div className="flex flex-col items-center justify-center mt-10">
            {userPlayer !== undefined && opponent !== undefined && (
              <PlayerAndSpectatorsInfo
                userPlayer={userPlayer}
                opponent={opponent}
                isSpectator={isSpectator}
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
