export interface PlayerAttributes{
    name: string;
    socketId: string;
    id: number;
    currentView: number;
    //private abilities: Ability[];
    //the winstreak is how many DUELS a player has won in a row. not the matches.
    winstreak: number;
    winstreakHigh: number;
    numSpectators: number;
    isBot: boolean;
    inGamePoints: number;
}

/**
 * This may need to be move, currently here for the events.ts
 */
export enum DuelResult {
    Draw = 0,
    Player1Wins = 1,
    Player2Wins = 2
}

export type Action = "ROCK" | "PAPER" | "SCISSORS" | "NONE";

