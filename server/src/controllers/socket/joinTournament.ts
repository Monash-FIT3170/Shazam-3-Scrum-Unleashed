import Player from "src/model/player";
import Tournament from "src/model/tournament";
import { Server, Socket } from "socket.io";
import { Events } from "../../../../types/socket/events";

export function joinTournamentSocket(
  socket: Socket,
  tournamentCode: string,
  playerName: string,
  tournamentMap: Map<string, Tournament>,

  io: Server<Events>,
) {
  const tournament = tournamentMap.get(tournamentCode);

  if (tournament == undefined) {
    console.error(
      `Player : ${playerName} was unable to join Game : ${tournamentCode}`,
    );
    io.to(socket.userID).emit("JOINED_GAME", "INVALID_GAME_CODE");
    return;
  }

  if (!tournament.canSocketJoin(socket.userID)) {
    console.error(
      `Player : ${socket.userID} has already connected to Game : ${tournamentCode}`,
    );
    // TODO need to send an event (USER_ALREADY_JOINED or something)
    return;
  }

  if (!tournament.isPlayerNameFree(playerName)) {
    console.log(`Player : ${playerName} is already taken`);
    io.to(socket.userID).emit("JOINED_GAME", "NAME_TAKEN");
    return;
  }

  const player = new Player(socket.userID, playerName, false);
  tournament.addPlayer(player);

  console.log(`Player : ${playerName} has joined Game : ${tournamentCode}`);

  io.to(socket.userID).emit("JOINED_GAME", "SUCCESS");
  io.to(tournament.hostUID).emit("PLAYERS_UPDATE", tournament.players);
}
