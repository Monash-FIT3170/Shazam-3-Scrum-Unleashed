export default abstract class Actor {
  public socketId: string;
  public name: string;

  constructor(socketId: string, name: string) {
    this.socketId = socketId;
    this.name = name;
  }
  
  // getters
  public getSocketID(): string { return this.socketId; }
  public getName(): string { return this.name; }

  // setters
  public setSocketID(socketId: string) { this.socketId = socketId; }
  public setName(name: string): void { this.name = name; }
}
