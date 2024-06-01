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

  for (const match of tournament.matches) {
    for (const currentPlayer of match.players) {
      for (const spectatorPlayer of tournament.players) {
        if (spectatorPlayer.spectatingId === currentPlayer.userID) {
          console.log("Spectator is ", spectatorPlayer.name);
          console.log("Player is ", currentPlayer.name);

          if (spectatorPlayer.isBot) {
            continue;
            //TODO - refactor
          }

          const socketSetID = io.sockets.adapter.rooms.get(
            spectatorPlayer.userID,
          );
          if (socketSetID === undefined || socketSetID.size !== 1) {
            // throw new Error("We fucked up");
            continue;
          }

          const playerSocketID = Array.from(socketSetID)[0];
          const playerSocket = io.sockets.sockets.get(playerSocketID);
          if (playerSocket === undefined) {
            throw new Error("Could not find player socket");
          }

          await playerSocket.join(match.matchRoomID);
        }
      }
    }

    io.to(tournament.hostUID).emit("ROUND_STARTED");
    void roundStartEmitter(tournament, io);
  }
}

export function roundTerminator(tournament: Tournament, io: Server<Events>) {
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

  for (const spectator of tournament.players) {
    // if player in the tournament is spectating a player in the match.
    if (
      spectator.spectatingId !== null &&
      match.players.map((e) => e.userID).includes(spectator.spectatingId)
    ) {
      spectators.push(spectator);
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

  for (const spectator of tournament.players) {
    for (const matchPlayer of match.players) {
      if (spectator.spectatingId === matchPlayer.userID) {
        matchPlayer.spectatorIDs.push(spectator.userID);
      }
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
