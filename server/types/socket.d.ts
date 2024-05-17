import "socket.io";

declare module "socket.io" {
  interface Socket {
    sessionID: string;
    userID: string;
  }
}
