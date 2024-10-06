import { Server } from "socket.io";
import { Events } from "../../../../types/socket/events";
import Tournament from "../tournament";
import Player from "../player";
import { MatchType } from "../../../../types/socket/eventArguments";

export interface Match {
  players: Player[];
  matchRoomID: string;
  duelsToWin: number;
  powerupsEnabled: boolean;

  getMatchWinner(): Player | null;
  startMatch(io: Server<Events>, tournament: Tournament): void;
  emitMatchState(io: Server<Events>): void;
  clearTimeouts(): void;
  type(): MatchType;
}
