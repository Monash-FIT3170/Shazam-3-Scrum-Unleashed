import Tournament from "src/model/tournament";
import { Server } from "socket.io";
import { Events } from "../../../types/socket/events";
import { playDuel } from "../controllers/socket/chooseAction";

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
    io.to(match.matchRoomID).emit("MATCH_INFO", match.players, false, null);
    match.startTimeout(playDuel(tournament, io), tournament.duelTime);
  }
}

async function playerJoinMatchRoom(
  userID: string,
  matchRoomID: string,
  io: Server<Events>,
) {
  const socketSetID = io.sockets.adapter.rooms.get(userID);
  if (socketSetID === undefined || socketSetID.size !== 1) {
    return undefined;
  }

  const playerSocketID = Array.from(socketSetID)[0];
  const playerSocket = io.sockets.sockets.get(playerSocketID);
  if (playerSocket !== undefined) {
    await playerSocket.join(matchRoomID);
  }
}
