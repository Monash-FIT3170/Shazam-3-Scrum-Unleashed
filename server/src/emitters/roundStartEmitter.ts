import Tournament from "src/model/tournament";
import { Server } from "socket.io";
import { Events } from "../../../types/socket/events";
import { getSocket } from "../utils/socketUtils";

export async function roundStartEmitter(
  tournament: Tournament,
  io: Server<Events>,
) {
  const matches = tournament.matches;
  for (const match of matches) {
    for (const player of match.players) {
      for (const spectatorID of player.spectatorIDs) {
        await playerJoinMatchRoom(spectatorID, match.matchRoomID, io);
      }

      if (!player.isBot) {
        await playerJoinMatchRoom(player.userID, match.matchRoomID, io);
      }
    }

    match.startMatch(io, tournament);
  }
  io.to(tournament.hostUID).emit("TOURNAMENT_STATE", tournament.players, true);
}

async function playerJoinMatchRoom(
  userID: string,
  matchRoomID: string,
  io: Server<Events>,
) {
  const playerSocket = getSocket(userID, io);
  if (playerSocket !== undefined) {
    await playerSocket.join(matchRoomID);
  }
}
