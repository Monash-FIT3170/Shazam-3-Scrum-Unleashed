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
    return this.tournamentBrackets[round - 1];
  }

  public getCurrentBracket(): Player[] {
    return this.tournamentBrackets[this.getRoundNumber() - 1];
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
    let nextID = players.length;
    //fill every 2nd spot with a bot
    const round1: Player[] = [];
    for (let i = 0; i < players.length; i++) {
      round1.push(players[i]);
      if (i < numBots) {
        round1.push(new Player("", `🤖Bot#${String(i)}`, nextID, true));
        nextID++;
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

  public createPlayerGroups(): Player[][] {
    const playerGroups: Player[][] = [];
    const remainingPlayers = this.getCurrentBracket();
    for (let i = 0; i < remainingPlayers.length; i++) {
      const startIndex = i * 2;
      const endIndex = Math.min(startIndex + 2, remainingPlayers.length);
      const group = remainingPlayers.slice(startIndex, endIndex);
      playerGroups.push(group);
    }
    return playerGroups;
  }

  public appendWinners(winners: Player[]) {
    this.tournamentBrackets.push(winners);
  }

  public createNextRound(): void {
    // creating the next round in the tournament
    const nextBracket = [];
    if (this.tournamentBrackets[-1].length != 1) {
      // if there is no winner yet
      for (const currPlayer of this.tournamentBrackets[-1]) {
        if (currPlayer.getWinstreak() != 0) {
          nextBracket.push(currPlayer);
        }
      }
      // adding new bracket into tournamentBrackets
      this.tournamentBrackets.push(nextBracket);
    }
  }

  // method used to assist in the drawing of all rounds
  // each subarray contains players who were eliminated / are currently in that round
  // empty subarrays represent the inner rounds that have not been reached yet
  public getAllRoundsResults(): Player[][] {
    // preparing vars required
    const resRounds = [];
    const playerList = this.tournamentBrackets[0];
    const numPlayers = playerList.length;
    // loop vars
    let roundPlayers = numPlayers;
    let roundIterator = 0;
    // executing loop to create round brackets
    while (roundPlayers != 0) {
      // creating array for all players who lost on that round / are in current round
      const round = [];
      // looking through all players to push the required players
      for (let i = 0; i < numPlayers; i++) {
        if (playerList[i].getMatchesWon() == roundIterator) {
          round.push(playerList[i]);
        }
      }
      // push to result bracket
      resRounds.push(round);
      // increment roundPlayers and roundIterator
      roundPlayers = Math.floor(roundPlayers / 2);
      roundIterator++;
    }
    return resRounds;
  }
}
