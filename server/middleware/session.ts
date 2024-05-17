import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import InMemorySessionStore from "socket/sessionStore";

export function sessionMiddleware(
  sessionStorage: InMemorySessionStore,
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) {
  const sessionID = socket.handshake.auth["sessionID"] as string;
  if (sessionID) {
    const userID = sessionStorage.findSession(sessionID);
    if (userID) {
      socket.sessionID = sessionID;
      socket.userID = userID;
      next();
      return;
    }
  }
  socket.sessionID = (Math.random() * 1000).toString(); // TODO actually generate
  socket.userID = (Math.random() * 1000).toString();
  next();
}
