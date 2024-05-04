/**
 * Current Rooms
 *
 * Player Room : all player of a game are connected to it, may be used for send game finished messages and stuff
 *
 */

export function playerRoomName(gameCode: string): string {
  return `GAME_${gameCode}_PLAYERS`;
}
