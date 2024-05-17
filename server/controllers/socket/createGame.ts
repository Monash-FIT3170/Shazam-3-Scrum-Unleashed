import Host from "model/actors/host";
import Game from "model/game";
import { Socket, Server } from "socket.io";

export function createGameSocket(
  socket: Socket,
  duelsPerMatch: number,
  duelTime: number,
  matchTime: number,
  gamesMap: Map<string, Game>,
  io: Server,
) {
  console.log(`Host : ${socket.id} is creating a game`);

  const host: Host = new Host(socket.id);
  const game: Game = new Game(host, duelsPerMatch, duelTime, matchTime);

  const gameCode = "000000";
  gamesMap.set(gameCode, game);

  io.to(host.socketId).emit("GAME_CREATED", gameCode);
}
