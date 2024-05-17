import Player from "model/actors/player";
import Game from "model/game";
import { Server, Socket } from "socket.io";
import { playerRoomName } from "socket/roomNames";

export async function joinGameSocket(
  gameCode: string,
  playerName: string,
  gamesMap: Map<string, Game>,
  socket: Socket,
  io: Server,
) {
  const game = gamesMap.get(gameCode);
  if (game == undefined) {
    console.log(`Player : ${playerName} was unable to join Game : ${gameCode}`);
    io.to(socket.id).emit("JOINED_GAME", "INVALID_GAME_CODE");
    return;
  }

  if (!game.canSocketJoin(socket.id)) {
    console.log(
      `Player : ${socket.id} has already connected to Game : ${gameCode}`,
    );
    return;
  }

  if (!game.isPlayerNameFree(playerName)) {
    console.log(`Player : ${playerName} is already taken`);
    io.to(socket.id).emit("JOINED_GAME", "NAME_TAKEN");
    return;
  }

  console.log(`Player : ${playerName} has joined Game : ${gameCode}`);

  const player = new Player(socket.id, playerName, 0, false);
  game.addPlayer(player);

  await socket.join(playerRoomName(gameCode));

  io.to(socket.id).emit("JOINED_GAME", "SUCCESS");
  io.to(game.HostSocketId).emit("PLAYER_HAS_JOINED", player);
}
