import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../../types/types.ts";
import { MatchType } from "../../../../types/socket/eventArguments.ts";
import { socket } from "../../App.tsx";
import TournamentWin from "../player-screen/tournament-win/TournamentWin.tsx";
import WaitingForMatchStart from "../player-screen/waiting-screens/WaitingForMatchStart.tsx";
import MatchOutcomeScreen from "../player-screen/outcome-screens/MatchOutcomeScreen.tsx";
import { Pong } from "../pong/Pong.tsx";
import { RPS } from "../rps/RPS.tsx";
import PlayerAndSpectatorsInfo from "../player-screen/match-overlay/PlayerAndSpectatorsInfo.tsx";
import ReactionOverlay from "../reactions/ReactionsOverlay.tsx";
import { SpectateMatchRes } from "../../../../types/requestTypes.ts";

interface PlayerScreenProps {
  matchData: SpectateMatchRes;
  tournamentCode: string;
  stopSpectating: (spectatingUserID: string) => void;
}

const HostSpectatorScreen = ({
  matchData,
  tournamentCode,
  stopSpectating,
}: PlayerScreenProps) => {
  const MATCH_COMPLETION_TIME = 4000;
  const [playerName] = useState("HOST");

  const [userPlayer, setUserPlayer] = useState<PlayerAttributes>(); // spectating player
  const [opponent, setOpponent] = useState<PlayerAttributes>();
  const [matchWinnerID, setMatchWinnerID] = useState<string>();
  const [tournamentWinner, setTournamentWinner] = useState<string>();
  const [matchType, setMatchType] = useState<MatchType>();
  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const [duelTime, setDuelTime] = useState(15);

  function setPlayers(players: PlayerAttributes[]) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.userID === socket.userID) {
        setIsPlayerOne(i + 1 === 1);
      }

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

  useEffect(() => {
    setPlayers(matchData.players);
    setMatchType(matchData.matchType);
    setMatchWinnerID(matchWinnerID);
  }, [matchData]);

  useEffect(() => {
    socket.on("MATCH_START", (players, matchType, duelTime) => {
      setPlayers(players);
      setMatchType(matchType);
      setDuelTime(duelTime);
    });

    socket.on("MATCH_DATA", (players, winnerUserID) => {
      setMatchWinnerID(winnerUserID);
      setPlayers(players);
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
        isSpectator={true}
      />
    );
    setTimeout(() => {
      setMatchWinnerID(undefined);
      setOpponent(undefined);
    }, MATCH_COMPLETION_TIME);
  } else {
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
            isSpectator={true}
            duelTime={duelTime}
          />
        );
        break;
      }
    }
  }

  return (
    <>
      {" "}
      <button
        className={`h-12 text-white fixed top-4 left-4 bg-primary text-3xl font-bold px-4 rounded-xl z-50 shadow-[0_0_10px_2px_rgba(0,0,0,0.5)]`}
        onClick={() => stopSpectating(userPlayer!.userID)}
      >
        RETURN
      </button>
      {/* TODO: Extract below... reused for player spectators... */}
      <div
        className={
          "fixed border-8 top-0 left-0 w-dvw h-dvh border-spectator-bg shadow-[inset_0_0_50px_0px_theme(colors.spectator-bg)]"
        }
      />
      {
        <ReactionOverlay
          gameCode={tournamentCode}
          spectatingID={userPlayer !== undefined ? userPlayer!.userID : null}
        />
      }
      <div className="pt-12">
        <div className="flex flex-col items-center justify-center mt-10 z-0">
          {userPlayer !== undefined && opponent !== undefined && (
            <PlayerAndSpectatorsInfo
              userPlayer={userPlayer}
              opponent={opponent}
              isSpectator={true}
            />
            // TODO probably only want to display during a match and not after a match
          )}
          {content}
        </div>
      </div>
    </>
  );
};

export default HostSpectatorScreen;
