import Tournament from "model/game";
import { Server } from "socket.io";

export async function allocatePlayersSocket(
  gameCode: string,
  gamesMap: Map<string, Tournament>,
  io: Server,
) {
  const game: Tournament | undefined = gamesMap.get(gameCode);
  if (!game) {
    return;
  }
  await game.allocateRooms(gameCode, io);
}
