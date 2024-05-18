import { Action } from "../../../types/types";

export interface Tournament {
  players: Player[];
  matchTime: number;
  duelsPerMatch: number;
  duelTime: number;
  hostUID: string;
  matches: Match[];
}

export interface Player {
  userID: string;
  name: string;
  spectatingId: string | null;
  playerData: PlayerData | null;
}

export interface Match {
  players: Player[];
}

export interface PlayerData {
  score: number;
  action: Action;
}
