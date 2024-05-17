//tournament manager class
//tournament class which takes in an array of Player objects, and then constructs the first level of the tournament bracket.
//has functions to help run the tournament, such as constructing the next level of the tournament after people win their matches. can also return specific brackets to display

import Player from "./actors/player";

export class TournamentManager {
  private tournamentBrackets: Player[][];

  constructor(players: Player[]) {
    this.tournamentBrackets = [];
    this.shufflePlayers(players);
    this.fillWithBots(players);
  }

  //getters
  public getRoundNumber(): number {
    return this.tournamentBrackets.length;
  }

  public getBracket(round: number): Player[] {
    return this.tournamentBrackets[round];
  }

  //misc methods

  //method to fill the match with bots if the number of players is not a power of 2
  private fillWithBots(players: Player[]) {
    //this function to find the next power of 2 was taken off stack overflow: https://stackoverflow.com/a/466256
    const nextPowerOf2: number = Math.pow(
      2,
      Math.ceil(Math.log(players.length) / Math.log(2)),
    );
    const numBots: number = nextPowerOf2 - players.length;
    //assuming player IDs are just from 0 to n-1
    //fill every 2nd spot with a bot
    const round1: Player[] = [];
    for (let i = 0; i < players.length; i++) {
      round1.push(players[i]);
      if (i < numBots) {
        round1.push(new Player(`🤖 Bot #" + ${String(i)}`, "", true));
      }
    }
    this.tournamentBrackets.push(round1);
  }

  private shufflePlayers(players: Player[]): Player[] {
    //use the fisher-yates shuffle algorithm, with the in place modification by Durstenfeld
    for (let i = players.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [players[i], players[rand]] = [players[rand], players[i]];
    }
    return players;
  }
}
