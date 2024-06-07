import { roundStartEmitter } from "src/emitters/roundStartEmitter";
import { Match } from "src/model/match";
import Player from "src/model/player";
import Tournament from "src/model/tournament";
import { Server } from "socket.io";
import { Events } from "../../../../types/socket/events";

export async function roundInitialisor(
  tournament: Tournament,
  io: Server<Events>,
) {
  const { matches, bots } = roundAllocator(tournament);

  tournament.players = [...tournament.players, ...bots];
  tournament.matches = matches;
  await roundStartEmitter(tournament, io);
}

export function roundTerminator(tournament: Tournament, io: Server<Events>) {
  for (const match of tournament.matches) {
    handleSpectators(match);
    io.in(match.matchRoomID).socketsLeave(match.matchRoomID);

    for (const player of match.players) {
      player.score = 0;
      player.actionChoice = null;
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

function roundAllocator(tournament: Tournament) {
  const winningPlayers = tournament.players.filter(
    (player) => !player.isEliminated,
  );

  const bots = createBots(winningPlayers);
  const matches = [];
  for (let i = 0; i < winningPlayers.length; i++) {
    if (i < bots.length) {
      matches.push(
        new Match([winningPlayers[i], bots[i]], tournament.duelsToWin),
      );
    } else {
      matches.push(
        new Match(
          [winningPlayers[i], winningPlayers[i + 1]],
          tournament.duelsToWin,
        ),
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
