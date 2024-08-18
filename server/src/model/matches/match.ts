import { Server } from "socket.io";
import { PlayerAttributes } from "../../../../types/types";
import { Events } from "../../../../types/socket/events";
import Tournament from "../tournament";
import Player from "../player";
import { MatchType } from "../../../../types/socket/eventArguments";

export interface Match {
  players: PlayerAttributes[];
  matchRoomID: string;
  duelsToWin: number;

  getMatchWinner(): Player | null;
  startMatch(io: Server<Events>, tournament: Tournament): void;
  emitMatchState(io: Server<Events>): void;
  type(): MatchType;
}
