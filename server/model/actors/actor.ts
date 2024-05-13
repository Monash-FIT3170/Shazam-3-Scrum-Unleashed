export default abstract class Actor {
  public socketId: string;

  constructor(socketId: string) {
    this.socketId = socketId;
  }
}
