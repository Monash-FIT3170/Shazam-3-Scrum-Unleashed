export default abstract class Actor {
  private _socketId: string;
  private _name: string;

  constructor(socketId: string, name: string) {
    this._socketId = socketId;
    this._name = name;
  }

  get socketId(): string {
    return this._socketId;
  }

  get name(): string {
    return this._name;
  }
}
