import Player from "model/actors/player";
import Tournament from "model/game";
import { Match } from "model/match";
import { Server, Socket } from "socket.io";

export async function startTournamentSocket(
  socket: Socket,
  gameCode: string,
  tournamentMap: Map<string, Tournament>,
  io: Server,
) {
  const tournament = tournamentMap.get(gameCode);

  if (tournament?.hostUID !== socket.userID) {
    throw new Error("You are not the host of this game");
    return;
  }

  if (tournament.players.length < 2) {
    // TODO : Return error to the client
    throw new Error("Not enough players to start the game");
    return;
  }

  const bots = createBots(tournament.players);
  const matches = [];
  for (let i = 0; i < tournament.players.length; i++) {
    if (i < bots.length) {
      matches.push(new Match([tournament.players[i], bots[i]]));
    } else {
      matches.push(
        new Match([tournament.players[i], tournament.players[i + 1]]),
      );
      i++;
    }
  }
  tournament.players = [...tournament.players, ...bots];
  tournament.matches = matches;
  io.to(tournament.hostUID).emit("TOURNAMENT_STARTED");

  for (let i = 0; i < tournament.matches.length; i++) {
    const match = matches[i];
    const roomName = generateUniqueRoomName(gameCode, i);

    for (const player of match.players) {
      if (player.isBot) {
        continue;
      }

      const socketSetID = io.sockets.adapter.rooms.get(player.userID);
      console.log(socketSetID);
      if (socketSetID === undefined || socketSetID.size === 0) {
        throw new Error("We fucked up");
        return;
      }

      const playerSocketID = Array.from(socketSetID)[0];
      const playerSocket = io.sockets.sockets.get(playerSocketID);
      if (playerSocket === undefined) {
        throw new Error("Could not find player socket");
        return;
      }

      await playerSocket.join(roomName);
    }
    io.to(roomName).emit("MATCH_STARTED", match.players);
  }
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

function generateUniqueRoomName(gameCode: string, roomNumber: number): string {
  return `GAME_${gameCode}&ROOM_${roomNumber.toString()}`;
}
