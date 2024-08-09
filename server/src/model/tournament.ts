import { Match } from "./match";
import Player from "./player";

type MatchType = "PONG" | "RPS";

export default class Tournament {
  hostUID: string;
  players: Player[];
  duelsToWin: number;
  duelTime: number;
  matchTime: number;
  matches: Match[];
  matchTypeOrder: MatchType[];
  roundCounter: number;

  constructor(
    hostID: string,
    duelsToWin: number,
    duelTime: number,
    matchTime: number,
    // matchType: MatchType,
  ) {
    this.hostUID = hostID;
    this.duelsToWin = duelsToWin;
    this.duelTime = duelTime;
    this.matchTime = matchTime;
    this.players = new Array<Player>();
    this.matches = [];
    this.matchTypeOrder = ["RPS"];
    this.roundCounter = 0;
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
