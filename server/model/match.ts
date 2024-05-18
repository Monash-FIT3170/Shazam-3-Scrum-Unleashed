import Player from "./actors/player";

export class Match {
  public players: Player[];
  public matchWinner: Player | null;

  constructor(players: Player[]) {
    this.players = players;
    this.matchWinner = null;
  }
}
