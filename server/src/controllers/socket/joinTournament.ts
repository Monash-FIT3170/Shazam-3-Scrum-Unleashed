import Player from "src/model/player";
import Tournament from "src/model/tournament";
import { Server, Socket } from "socket.io";
import { Events } from "../../../../types/socket/events";
import { obscenityMatcher } from "../../store";

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
      `Player : ${playerName} was unable to join Tournament : ${tournamentCode}`,
    );
    io.to(socket.userID).emit("JOINED_TOURNAMENT", "INVALID_TOURNAMENT_CODE");
    return;
  }

  if (!tournament.canSocketJoin(socket.userID)) {
    console.error(
      `Player : ${socket.userID} has already connected to Tournament : ${tournamentCode}`,
    );
    io.to(socket.userID).emit("JOINED_TOURNAMENT", "SOCKET_ALREADY_CONNECTED");
    return;
  }

  if (obscenityMatcher.hasMatch(playerName)) {
    console.error(`Player : ${socket.userID} has an inappropriate name`);
    io.to(socket.userID).emit("JOINED_TOURNAMENT", "INAPPROPRIATE_NAME");
    return;
  }

  if (!tournament.isPlayerNameFree(playerName)) {
    console.log(`Player : ${playerName} is already taken`);
    io.to(socket.userID).emit("JOINED_TOURNAMENT", "NAME_TAKEN");
    return;
  }

  const player = new Player(socket.userID, playerName, false);
  tournament.addPlayer(player);

  console.log(`Player : ${playerName} has joined Game : ${tournamentCode}`);

  io.to(socket.userID).emit("JOINED_TOURNAMENT", "SUCCESS");
  io.to(tournament.hostUID).emit("PLAYERS_UPDATE", tournament.players);
}
