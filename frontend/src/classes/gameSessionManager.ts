import { Player } from "./player";

export class gameSessionManager{
    private player1: Player;
    private player2: Player;
    private static rules: {[key:string]: string} = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    }

    constructor(player1: Player, player2: Player){
        this.player1 = player1;
        this.player2 = player2;

    }

    public getPlayer1(){
        return this.getPlayer1;
    }

    public getPlayer2(){
        return this.getPlayer2;
    }

    public playRound(player1Choice: string, player2Choice:string): Player | null{
        if(gameSessionManager.rules[player1Choice] == player2Choice){
            return this.player1;
        }
        else if(player1Choice == player2Choice){
            console.log("its a tie");
            return null;

        }
        else{
            return this.player2;
        }
        

    }





}