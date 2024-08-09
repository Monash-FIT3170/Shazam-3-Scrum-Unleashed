import { roundStartEmitter } from "src/emitters/roundStartEmitter";
import Player from "src/model/player";
import Tournament from "src/model/tournament";
import { Server } from "socket.io";
import { Events } from "../../../../types/socket/events";
import { Match } from "src/model/match";
import { PongMatch } from "../../model/pongMatch";
import { tournamentMap } from "../../store";
import { RpsMatch } from "../../model/rpsMatch";

const LIFE_AFTER_COMPLETION = 60000;
const ROUND_BUFFER_TIME = 8000;

export async function roundInitialiser(
  tournament: Tournament,
  io: Server<Events>,
) {
  const { matches, bots } = roundAllocator(tournament);

  tournament.players = [...tournament.players, ...bots];
  tournament.matches = matches;
  await roundStartEmitter(tournament, io);
}

export function roundChecker(
  tournament: Tournament,
  io: Server<Events>,
  match: Match,
) {
  if (tournament.matches.every((e) => e.getMatchWinner() !== null)) {
    setTimeout(() => {
      if (tournament.matches.length === 1) {
        io.to(match.matchRoomID)
          .to(tournament.hostUID)
          .emit("TOURNAMENT_COMPLETE", match.getMatchWinner()?.name ?? "");

        setTimeout(() => {
          io.in(match.matchRoomID).socketsLeave(match.matchRoomID);
          tournamentMap.delete(tournament.hostUID);
        }, LIFE_AFTER_COMPLETION);
        return;
      }
      roundTerminator(tournament, io);
      io.to(tournament.hostUID).emit("PLAYERS_UPDATE", tournament.players);
      void roundInitialiser(tournament, io);
    }, ROUND_BUFFER_TIME);
  }
}

export function roundTerminator(tournament: Tournament, io: Server<Events>) {
  tournament.roundCounter++;
  for (const match of tournament.matches) {
    handleSpectators(match);
    io.in(match.matchRoomID).socketsLeave(match.matchRoomID);

    for (const player of match.players) {
      player.score = 0;
      player.gameData = null;
    }
  }
}

function handleSpectators(match: Match) {
  const matchWinner = match.getMatchWinner();
  if (matchWinner === null) {
    console.error("No match winner found.");
    return;
  }

  for (const player of match.players) {
    if (player.userID !== matchWinner.userID) {
      matchWinner.spectatorIDs.push(player.userID);
      matchWinner.spectatorIDs = matchWinner.spectatorIDs.concat(
        player.spectatorIDs,
      );
      player.isEliminated = true;
    }
  }
}

function createMatch(players: Player[], tournament: Tournament) {
  switch (tournament.roundCounter % tournament.matchTypeOrder.length) {
    case 0:
      return new RpsMatch(players, tournament.duelsToWin);
    case 1:
      return new PongMatch(players, tournament.duelsToWin, tournament);
    default:
      return new RpsMatch(players, tournament.duelsToWin);
  }
}

function roundAllocator(tournament: Tournament): {
  matches: Match[];
  bots: Player[];
} {
  const winningPlayers = tournament.players.filter(
    (player) => !player.isEliminated,
  );

  const bots = createBots(winningPlayers);
  const matches = [];
  for (let i = 0; i < winningPlayers.length; i++) {
    if (i < bots.length) {
      matches.push(createMatch([winningPlayers[i], bots[i]], tournament));
    } else {
      matches.push(
        createMatch([winningPlayers[i], winningPlayers[i + 1]], tournament),
      );
      i++;
    }
  }
  return { matches, bots };
}

function createBots(players: Player[]) {
  const bots = [];
  const nextPowerOf2: number = Math.pow(
    2,
    Math.ceil(Math.log(players.length) / Math.log(2)),
  );
  const numBots: number = nextPowerOf2 - players.length;

  for (let i = 0; i < numBots; i++) {
    const bot = new Player("", `🤖 Bot #${String(i + 1)}`, true);
    bots.push(bot);
  }
  return bots;
}
