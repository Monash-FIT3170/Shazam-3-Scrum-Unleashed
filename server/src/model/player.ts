import { Action, PlayerAttributes } from "../../../types/types";

export default class Player implements PlayerAttributes {
  public userID: string;
  public name: string;
  public score: number;
  public actionChoice: Action;
  public isBot: boolean;
  public isEliminated: boolean;
  public spectatorIDs: string[];

  constructor(userID: string, name: string, isBot: boolean) {
    this.userID = userID;
    this.name = name;
    this.score = 0;
    this.isBot = isBot;
    this.actionChoice = null;
    this.isEliminated = false;
    this.spectatorIDs = [];
  }
}
