import Player from "./actors/player";
import { handleRoomAllocation } from "../socketRoomManager";
import { Server } from "socket.io";

export default class Game {
  private _hostID: string;
  private players: Player[];
  private duelsPerMatch: number;
  private duelTime: number;
  private matchTime: number;

  constructor(
    hostID: string,
    duelsPerMatch: number,
    duelTime: number,
    matchTime: number,
  ) {
    this._hostID = hostID;
    this.duelsPerMatch = duelsPerMatch;
    this.duelTime = duelTime;
    this.matchTime = matchTime;
    this.players = new Array<Player>();
  }

  get hostID(): string {
    return this._hostID;
  }

  public addPlayer(player: Player) {
    if (
      this.canSocketJoin(player.userID) &&
      this.isPlayerNameFree(player.name)
    ) {
      this.players.push(player);
    }
  }

  public canSocketJoin(socketId: string) {
    for (const p of this.players) {
      if (p.userID === socketId) {
        return false;
      }
    }
    return true;
  }

  public isPlayerNameFree(name: string): boolean {
    for (const p of this.players) {
      if (p.name === name) {
        return false;
      }
    }
    return true;
  }

  public async allocateRooms(gameCode: string, io: Server) {
    await handleRoomAllocation(this.players, gameCode, io);
  }

  public getPlayers() {
    return this.players;
  }
}
