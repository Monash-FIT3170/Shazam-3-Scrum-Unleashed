import Player from "./actors/player";
import Host from "./actors/host";
// import { handleRoomAllocation } from "../socketRoomManager";
import { TournamentManager } from "./tournamentManager";
import { handleRoomAllocation } from "../server";

export default class Game {
  private host: Host;
  private players: Player[];
  private duelsPerMatch: number;
  private duelTime: number;
  private matchTime: number;
  private tournamentManager: TournamentManager;

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
    this.tournamentManager = new TournamentManager(this.players);
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

  public async allocateRooms(gameCode: string) {
    await handleRoomAllocation(
      this.tournamentManager.createPlayerGroups(),
      gameCode,
    );
  }

  public startTournament() {
    this.tournamentManager = new TournamentManager(this.players);
    console.log("Tournament started (Game.ts)");
    console.log(this.tournamentManager.getCurrentBracket());
  }

  public getRemainingPlayers() {
    return this.tournamentManager.getCurrentBracket();
  }

  public getPlayers() {
    return this.players;
  }

  public getTournamentManager() {
    return this.tournamentManager;
  }
}
