import Tournament from "src/model/tournament";
import { Server } from "socket.io";

export async function roundStartEmitter(tournament: Tournament, io: Server) {
  const matches = tournament.matches;
  for (const match of matches) {
    for (const player of match.players) {
      if (player.isBot) {
        continue;
      }

      const socketSetID = io.sockets.adapter.rooms.get(player.userID);
      if (socketSetID === undefined || socketSetID.size !== 1) {
        // throw new Error("We fucked up");
        continue;
      }

      const playerSocketID = Array.from(socketSetID)[0];
      const playerSocket = io.sockets.sockets.get(playerSocketID);
      if (playerSocket === undefined) {
        throw new Error("Could not find player socket");
      }

      await playerSocket.join(match.matchRoomID);
    }
    io.to(match.matchRoomID).emit("MATCH_STARTED", match.players);
  }
}
