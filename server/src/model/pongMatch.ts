import { Server } from "socket.io";
import { PlayerAttributes, PongBallPosition } from "../../../types/types";
import { Match } from "./match";
import Player from "./player";
import { Events } from "../../../types/socket/events";

export class PongMatch implements Match {
  duelsToWin: number;
  matchRoomID: string;
  players: PlayerAttributes[];
  ballPosition: PongBallPosition;

  constructor(players: Player[], duelsToWin: number) {
    this.players = players;
    this.matchRoomID = crypto.randomUUID();
    this.duelsToWin = duelsToWin;
    this.ballPosition = {
      x: 0,
      y: 0,
    };
  }

  isDuelComplete(): boolean {
    return false;
  }

  getMatchWinner(): Player | null {
    return null;
  }

  emitGameData(io: Server<Events>): void {
    io.to(this.matchRoomID).emit(
      "PONG_STATE",
      this.ballPosition,
      this.players,
      this.isDuelComplete(),
      this.getMatchWinner()?.name ?? null,
    );
  }
}
