

import {tournamentMap} from "../../store";
import {Server} from "socket.io";
import {getSocket} from "../../utils/socketUtils";

export const spectateMatchSocket =
    (io: Server) =>
        async (hostID: string, tournamentCode: string, playerUserID: string,) => {

            const match = tournamentMap.get(tournamentCode)?.getMatch(playerUserID);

            if (!match) {
                return;
            }

            const hostSocket = getSocket(hostID, io);
            if (hostSocket) {
                await hostSocket.join(match.matchRoomID);
                io.to(hostID).emit(
                    "MATCH_START",
                    match.players,
                    match.type()
                );

            }
        };
