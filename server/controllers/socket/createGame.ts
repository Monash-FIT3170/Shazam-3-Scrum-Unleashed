import Game from "model/game";
import { Socket, Server } from "socket.io";

export async function createGameSocket(
  socket: Socket,
  duelsPerMatch: number,
  duelTime: number,
  matchTime: number,
  gamesMap: Map<string, Game>,
  io: Server,
) {
  console.log(`Host : ${socket.userID} is creating a game`);

  const game: Game = new Game(
    socket.userID,
    duelsPerMatch,
    duelTime,
    matchTime,
  );

  let gameCode;
  do {
    gameCode = Math.random().toString().substring(2, 8);
  } while (gamesMap.has(gameCode));

  gamesMap.set(gameCode, game);

  await socket.join(socket.userID);

  io.to(socket.userID).emit("GAME_CREATED", gameCode);
}
