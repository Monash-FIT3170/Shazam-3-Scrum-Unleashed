import { roundStartEmitter } from "src/emitters/roundStartEmitter";
import { Match } from "src/model/match";
import Player from "src/model/player";
import Tournament from "src/model/tournament";
import { Server } from "socket.io";

export function roundInitialisor(tournament: Tournament, io: Server) {
  const { matches, bots } = roundAllocator(tournament);

  tournament.players = [...tournament.players, ...bots];
  tournament.matches = matches;
  io.to(tournament.hostUID).emit("ROUND_STARTED");
  void roundStartEmitter(tournament, io);
}

export function roundTerminator(tournament: Tournament, io: Server) {
  for (const match of tournament.matches) {
    handleSpectators(tournament, match);
    io.in(match.matchRoomID).socketsLeave(match.matchRoomID);

    for (const player of match.players) {
      player.score = 0;
      player.actionChoice = null;
    }
  }
}

function handleSpectators(tournament: Tournament, match: Match) {
  const spectators: Player[] = [];

  for (const player of tournament.players) {
    // if player in the tournament is spectating a player in the match.
    if (
      player.spectatingId !== null &&
      match.players.map((e) => e.userID).includes(player.spectatingId)
    ) {
      spectators.push(player);
    }
  }

  const matchWinner = match.getMatchWinner();

  if (matchWinner === null) {
    throw new Error("FUck");
  }

  matchWinner.spectatorCount = spectators.length + 1;

  for (const spectator of spectators) {
    spectator.spectatingId = matchWinner.userID;
  }

  // set losing player to be spectator
  for (const player of match.players) {
    if (player.userID !== matchWinner.userID) {
      player.spectatingId = matchWinner.userID;
    }
  }
}

function roundAllocator(tournament: Tournament) {
  const winningPlayers = tournament.players.filter(
    (player) => player.spectatingId === null,
  );

  const bots = createBots(winningPlayers);
  const matches = [];
  for (let i = 0; i < winningPlayers.length; i++) {
    if (i < bots.length) {
      matches.push(
        new Match(
          [winningPlayers[i], bots[i]],
          crypto.randomUUID(),
          tournament.duelsToWin,
        ),
      );
    } else {
      matches.push(
        new Match(
          [winningPlayers[i], winningPlayers[i + 1]],
          crypto.randomUUID(),
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
