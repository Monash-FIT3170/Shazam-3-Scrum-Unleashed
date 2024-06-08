import { roundInitialiser } from "src/controllers/helper/roundHelper";
import Tournament from "src/model/tournament";
import { Server, Socket } from "socket.io";
import { Events } from "../../../../types/socket/events";

export async function startTournamentSocket(
  socket: Socket,
  tournamentCode: string,
  tournamentMap: Map<string, Tournament>,
  io: Server<Events>,
) {
  const tournament = tournamentMap.get(tournamentCode);

  if (tournament?.hostUID !== socket.userID) {
    console.error("You are not the host of this game");
    return;
  }

  await roundInitialiser(tournament, io);
}
