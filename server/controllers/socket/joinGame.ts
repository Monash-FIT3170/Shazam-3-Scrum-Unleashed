import Player from "model/actors/player";
import Tournament from "model/game";
import { Server, Socket } from "socket.io";
import { playerRoomName } from "socket/roomNames";

export async function joinGameSocket(
  gameCode: string,
  playerName: string,
  gamesMap: Map<string, Tournament>,
  socket: Socket,
  io: Server,
) {
  const game = gamesMap.get(gameCode);

  if (game == undefined) {
    console.log(`Player : ${playerName} was unable to join Game : ${gameCode}`);
    io.to(socket.userID).emit("JOINED_GAME", "INVALID_GAME_CODE");
    return;
  }

  if (!game.canSocketJoin(socket.userID)) {
    console.log(
      `Player : ${socket.userID} has already connected to Game : ${gameCode}`,
    );
    // TODO may need to send an event (USER_ALREADY_JOINED or something)
    return;
  }

  if (!game.isPlayerNameFree(playerName)) {
    console.log(`Player : ${playerName} is already taken`);
    io.to(socket.userID).emit("JOINED_GAME", "NAME_TAKEN");
    return;
  }

  console.log(`Player : ${playerName} has joined Game : ${gameCode}`);

  const player = new Player(socket.userID, playerName, false);
  game.addPlayer(player);

  await socket.join(playerRoomName(gameCode));

  io.to(socket.userID).emit("JOINED_GAME", "SUCCESS");
  io.to(game.hostUID).emit("PLAYER_HAS_JOINED", player);
}
