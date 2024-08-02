export interface PlayerAttributes {
  name: string;
  userID: string;
  gameData: Action | PongPaddlePosition;
  score: number;
  isBot: boolean;
  isEliminated: boolean;
  spectatorIDs: string[];
}

export type Action = "ROCK" | "PAPER" | "SCISSORS" | null;

export type ReactionType =
  | "HEART"
  | "LAUGHING"
  | "SKULL"
  | "PARTY_POPPER"
  | "GOAT";

export interface ReactionData {
  reaction: ReactionType;
  x: number;
  y: number;
}

export interface PongBallPosition {
  x: number;
  y: number;
}

export interface PongPaddlePosition {
  x: number;
}

