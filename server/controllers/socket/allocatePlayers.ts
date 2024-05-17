import Game from "model/game";
import { Server } from "socket.io";

export async function allocatePlayersSocket(
  gameCode: string,
  gamesMap: Map<string, Game>,
  io: Server,
) {
  const game: Game | undefined = gamesMap.get(gameCode);
  if (!game) {
    return;
  }
  await game.allocateRooms(gameCode, io);
}
