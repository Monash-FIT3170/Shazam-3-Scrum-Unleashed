export interface PlayerAttributes{
    name: string;
    id: number;
    currentView: number;
    //private abilities: Ability[];
    //the winstreak is how many DUELS a player has won in a row. not the matches.
    winstreak: number;
    winstreakHigh: number;
    numSpectators: number;
    isBot: boolean;
    ingamePoints: number;
}
