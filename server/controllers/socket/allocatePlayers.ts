import Game from "model/game";

export async function allocatePlayersSocket(
  gameCode: string,
  gamesMap: Map<string, Game>,
) {
  const game: Game | undefined = gamesMap.get(gameCode);
  if (!game) {
    return;
  }
  await game.allocateRooms(gameCode);
}
