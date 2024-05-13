export default abstract class Actor {
  public socketId: string;

  constructor(socketId: string) {
    this.socketId = socketId;
  }

  // getters
  public getSocketID(): string {
    return this.socketId;
  }
}
