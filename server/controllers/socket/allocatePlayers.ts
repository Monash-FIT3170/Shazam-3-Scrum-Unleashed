import Tournament from "model/game";
import { Server } from "socket.io";

export async function allocatePlayersSocket(
  gameCode: string,
  tournamentMap: Map<string, Tournament>,
  io: Server,
) {
  const tournament = tournamentMap.get(gameCode);
  if (!tournament) {
    return;
  }
  await tournament.allocateRooms(gameCode, io);
}
