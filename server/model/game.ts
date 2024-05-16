import Player from "./actors/player";
import Host from "./actors/host";

export default class Game {
  private host: Host;
  private players: Player[];
  private duelsPerMatch: number;
  private duelTime: number;
  private matchTime: number;

  constructor(
    host: Host,
    duelsPerMatch: number,
    duelTime: number,
    matchTime: number,
  ) {
    this.host = host;
    this.duelsPerMatch = duelsPerMatch;
    this.duelTime = duelTime;
    this.matchTime = matchTime;
    this.players = new Array<Player>();
  }

  get HostSocketId(): string {
    return this.host.socketId;
  }

  public addPlayer(player: Player) {
    if (
      this.canSocketJoin(player.socketId) &&
      this.isPlayerNameFree(player.name)
    ) {
      this.players.push(player);
    }
  }

  public canSocketJoin(socketId: string) {
    for (const p of this.players) {
      if (p.socketId === socketId) {
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

  public getPlayers(): Player[] {
    return this.players;
  }
}
