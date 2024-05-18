import Player from "./actors/player";
import { handleRoomAllocation } from "../socketRoomManager";
import { Server } from "socket.io";
import { Match } from "./match";

export default class Tournament {
  public hostUID: string;
  public players: Player[];
  public duelsPerMatch: number;
  public duelTime: number;
  public matchTime: number;
  public matches: Match[];

  constructor(
    hostID: string,
    duelsPerMatch: number,
    duelTime: number,
    matchTime: number,
  ) {
    this.hostUID = hostID;
    this.duelsPerMatch = duelsPerMatch;
    this.duelTime = duelTime;
    this.matchTime = matchTime;
    this.players = new Array<Player>();
    this.matches = [];
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
      if (p.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
        return false;
      }
    }
    return true;
  }

  public async allocateRooms(gameCode: string, io: Server) {
    await handleRoomAllocation(this.players, gameCode, io);
  }
}
