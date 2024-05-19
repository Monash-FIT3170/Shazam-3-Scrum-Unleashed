export interface PlayerAttributes {
  name: string;
  userID: string;
  actionChoice: Action;
  score: number;
  isBot: boolean;
  spectatingId: string | null;
  spectatorCount: number;
  spectatorIDs: string[];
}

export type Action = "ROCK" | "PAPER" | "SCISSORS" | null;

export type ReactionType =
  | "HEART"
  | "LAUGHING"
  | "SKULL"
  | "PARTY_POPPER"
  | "GOAT";
