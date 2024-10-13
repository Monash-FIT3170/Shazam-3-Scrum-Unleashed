export interface PlayerAttributes {
    name: string;
    userID: string;
    score: number;
    isBot: boolean;
    isEliminated: boolean;
    spectatorIDs: string[];
}

export type Action = "ROCK" | "PAPER" | "SCISSORS" | null;

export type RPSPowerup = "SHIELD" | "MOVEKILLER" | "TIEBREAKER" | null;

export type RPSPowerupSpawn = {powerup: RPSPowerup, onAction:Action};

export type PongPowerup = "Bigger Paddle" | "Shrunken Paddle" | "Invert Controls" | null

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

export interface PongBallState {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
}

export interface PongPaddleState {
    x: number;
    y: number;
    direction: number; // 0 = no movement, 1 = right, -1 = left
    width: number;
    isReversedControl: boolean;
}

export interface PongPowerupSprite {
    x: number;
    y: number;
    name: PongPowerup;
}
