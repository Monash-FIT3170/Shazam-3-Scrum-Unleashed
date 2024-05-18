export interface PlayerAttributes {
  name: string;
  userID: string;
  actionChoice: Action;
  score: number;
  isBot: boolean;
  spectatingId: string | null;
}

/**
 * This may need to be move, currently here for the events.ts
 */
export enum DuelResult {
  Draw = 0,
  Player1Wins = 1,
  Player2Wins = 2,
}

export type Action = "ROCK" | "PAPER" | "SCISSORS" | null;

export type ReactionType =
  | "HEART"
  | "LAUGHING"
  | "SKULL"
  | "PARTY_POPPER"
  | "GOAT";
