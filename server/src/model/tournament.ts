import Player from "./player";
import { Match } from "./match";

export default class Tournament {
  public hostUID: string;
  public players: Player[];
  public duelsToWin: number;
  public duelTime: number;
  public matchTime: number;
  public matches: Match[];

  constructor(
    hostID: string,
    duelsToWin: number,
    duelTime: number,
    matchTime: number,
  ) {
    this.hostUID = hostID;
    this.duelsToWin = duelsToWin;
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

  public getMatch(playerUserID: string) {
    for (const match of this.matches) {
      for (const player of match.players) {
        if (player.userID === playerUserID) {
          return match;
        }
      }
    }
    return null;
  }
}
