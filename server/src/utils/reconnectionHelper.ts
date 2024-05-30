import { Server, Socket } from "socket.io";
import Tournament from "src/model/tournament";
import { Events } from "../../../types/socket/events";

export async function reconnectionHandler(
  socket: Socket,
  io: Server<Events>,
  tournamentMap: Map<string, Tournament>,
) {
  if (socket.data.tournamentCode) {
    const tournament = tournamentMap.get(socket.data.tournamentCode);
    if (tournament === undefined) {
      return;
    }
    for (const match of tournament.matches) {
      for (const player of match.players) {
        if (
          player.userID === socket.userID ||
          player.spectatorIDs.includes(socket.userID)
        ) {
          await socket.join(match.matchRoomID);

          if (tournament.matches.length === 1 && match.getMatchWinner()) {
            io.to(socket.userID).emit(
              "TOURNAMENT_COMPLETE",
              match.getMatchWinner()?.name ?? "",
            );
          } else {
            io.to(socket.userID).emit(
              "MATCH_INFO",
              match.players,
              false,
              match.getMatchWinner()?.userID ?? null,
            );
          }
          break;
        }
      }
    }
  }
}
