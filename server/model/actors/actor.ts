export default abstract class Actor {
  public socketId: string;
  public name: string;

  constructor(socketId: string, name: string) {
    this.socketId = socketId;
    this.name = name;
  }
}
