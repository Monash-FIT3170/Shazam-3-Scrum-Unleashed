import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import InMemorySessionStore from "src/store/sessionStore";

export function sessionMiddleware(
  sessionStorage: InMemorySessionStore,
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) {
  const sessionID = socket.handshake.auth["sessionID"] as string;
  const tournamentCode = socket.handshake.auth["tournamentCode"] as
    | string
    | undefined;
  if (sessionID) {
    const userID = sessionStorage.findSession(sessionID);
    if (userID) {
      socket.sessionID = sessionID;
      socket.userID = userID;
      socket.data.tournamentCode = tournamentCode;
      next();
      return;
    }
  }
  socket.sessionID = crypto.randomUUID();
  socket.userID = crypto.randomUUID();
  next();
}
