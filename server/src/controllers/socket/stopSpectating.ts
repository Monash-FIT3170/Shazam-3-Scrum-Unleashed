import { tournamentMap } from "../../store";
import { Server } from "socket.io";
import { getSocket } from "../../utils/socketUtils";

export const stopSpectatingSocket =
  (io: Server) =>
  async (hostID: string, tournamentCode: string, playerUserID: string) => {
    const match = tournamentMap.get(tournamentCode)?.getMatch(playerUserID);

    if (!match) {
      return;
    }

    const hostSocket = getSocket(hostID, io);
    if (hostSocket) {
      await hostSocket.leave(match.matchRoomID);
      for (const player of match.players) {
        if (player.userID === playerUserID) {
          player.spectatorIDs = player.spectatorIDs.filter(
            (id) => id !== hostID,
          );
        }
      }
    }
  };
