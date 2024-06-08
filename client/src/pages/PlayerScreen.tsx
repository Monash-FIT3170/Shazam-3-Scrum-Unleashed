import { useEffect, useState } from "react";
import WaitingForMatchStart from "../components/player-screen/waiting-screens/WaitingForMatchStart.tsx";
import { socket } from "../App";
import { PlayerAttributes } from "../../../types/types.ts";
import ChoosePlayerMove from "../components/player-screen/choose-move/ChoosePlayerMove.tsx";
import { useLoaderData } from "react-router-dom";
import DuelOutcome from "../components/player-screen/outcome-screens/DuelOutcome.tsx";
import PlayerAndSpectatorsInfo from "../components/player-screen/match-overlay/PlayerAndSpectatorsInfo.tsx";
import MatchOutcomeScreen from "../components/player-screen/outcome-screens/MatchOutcomeScreen.tsx";
import TournamentWin from "../components/player-screen/tournament-win/TournamentWin.tsx";
import ReactionOverlay from "../components/reactions/ReactionsOverlay.tsx";

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
  const [isSpectator, setIsSpectator] = useState(false);

  function setPlayers(players: PlayerAttributes[]) {
    for (const player of players) {
      let canSetPlayer = true;
      for (const spectatingID of player.spectatorIDs) {
        if (socket.userID === spectatingID) {
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
    socket.on("MATCH_INFO", (players, isDuelComplete, winnerUserID) => {
      console.log(players);
      setPlayers(players);
      setDuelComplete(isDuelComplete);
      setIsSpectator(getIsSpectator(players));

      console.log("is spectator ", getIsSpectator(players));

      if (winnerUserID) {
        setMatchComplete(true);
        setWinnerUserID(winnerUserID);
      }
    });

    socket.on("TOURNAMENT_COMPLETE", (playerName) => {
      setTournamentWinner(playerName);
    });

    return () => {
      socket.off("MATCH_INFO");
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
      setOpponent(undefined);
    }, 4000);
  } else if (isSpectator) {
    content = <></>;
  } else {
    content = <ChoosePlayerMove tournamentCode={tournamentCode} />;
  }

  return (
    <>
      {
        <ReactionOverlay
          gameCode={tournamentCode}
          spectatingID={isSpectator ? userPlayer!.userID : null}
        />
      }
      <div className="overflow-hidden h-screen relative">
        <div className="pt-12">
          <div className="flex flex-col items-center justify-center mt-10">
            {userPlayer !== undefined && opponent !== undefined && (
              <PlayerAndSpectatorsInfo
                userPlayer={userPlayer}
                opponent={opponent}
              />
              // TODO probably only want to display during a match and not after a match
            )}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerScreen;
