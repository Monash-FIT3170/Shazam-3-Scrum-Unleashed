//Very basic player class, can be expanded if needed
//Author: Team Buddy (4), Aaron Abbott 32520441


export class Player {
    private name: string;
    private id: number;
    private isSpectating: boolean;
    //private abilities: Ability[];
    //the winstreak is how many DUELS a player has won in a row. not the matches.
    private winstreak: number;
    private spectators: number;
    private isBot: boolean;

    constructor(name: string, id: number, isBot: boolean) {
        this.name = name;
        this.id = id;
        this.isSpectating = false;
        //this.abilities = [];
        this.winstreak = 0;
        this.spectators = 0;
        this.isBot = isBot;
    }
}