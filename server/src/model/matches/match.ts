import { Server } from "socket.io";
import { PlayerAttributes } from "../../../../types/types";
import { Events } from "../../../../types/socket/events";
import Player from "../player";
import Tournament from "../tournament";

export interface Match {
  players: PlayerAttributes[];
  matchRoomID: string;
  duelsToWin: number;

  getMatchWinner(): Player | null;
  startMatch(io: Server<Events>, tournament: Tournament): void;
}
