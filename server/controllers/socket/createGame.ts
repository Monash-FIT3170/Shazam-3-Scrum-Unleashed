import Tournament from "model/game";
import { Socket, Server } from "socket.io";

export async function createTournamentSocket(
  socket: Socket,
  duelsPerMatch: number,
  duelTime: number,
  matchTime: number,
  tournamentMap: Map<string, Tournament>,
  io: Server
) {
  console.log(`Host : ${socket.userID} is creating a game`);

  const tournament: Tournament = new Tournament(
    socket.userID,
    duelsPerMatch,
    duelTime,
    matchTime
  );

  let tournamentCode;
  do {
    tournamentCode = Math.random().toString().substring(2, 8);
  } while (tournamentMap.has(tournamentCode));

  tournamentMap.set(tournamentCode, tournament);

  await socket.join(socket.userID);

  io.to(socket.userID).emit("TOURNAMENT_CREATED", tournamentCode);
}
