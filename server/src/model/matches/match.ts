import { Server } from "socket.io";
import { PlayerAttributes } from "../../../../types/types";
import { Events } from "../../../../types/socket/events";
import Tournament from "../tournament";
import Player from "../player";
import crypto from "node:crypto";

export abstract class Match {
  players: PlayerAttributes[];
  matchRoomID: string;
  duelsToWin: number;

  protected constructor(players: PlayerAttributes[], duelsToWin: number) {
    this.players = players;
    this.duelsToWin = duelsToWin;
    this.matchRoomID = crypto.randomUUID();
  }

  getMatchWinner(): Player | null {
    if (this.players[0].score >= this.duelsToWin) {
      this.players[1].isEliminated = true;
      return this.players[0];
    } else if (this.players[1].score >= this.duelsToWin) {
      this.players[0].isEliminated = true;
      return this.players[1];
    } else {
      return null;
    }
  }

  abstract startMatch(io: Server<Events>, tournament: Tournament): void;
}
