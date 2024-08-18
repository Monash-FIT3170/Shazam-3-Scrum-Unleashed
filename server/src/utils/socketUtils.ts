import {Server} from "socket.io";
import {Events} from "../../../types/socket/events";


export const getSocket = (  userID: string,
                         io: Server<Events>,
) => {
    const socketSetID = io.sockets.adapter.rooms.get(userID);
    if (socketSetID === undefined || socketSetID.size !== 1) {
        return undefined;
    }

    const playerSocketID = Array.from(socketSetID)[0];
    return io.sockets.sockets.get(playerSocketID);
}

