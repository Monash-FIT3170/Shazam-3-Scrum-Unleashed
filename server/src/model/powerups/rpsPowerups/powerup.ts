import { RpsMatch } from "../../matches/rpsMatch";
export default abstract class Powerup {
  name: string;
  description: string;
  targetSelf: boolean; //whether this effect will hit the user or the opponent
  instantUse: boolean; //instant use is whether it activates immediately. Other powerups are used at the end of the round to check who won.
  priority: number; //higher number means higher priority. for non-instant powerups, this means the larger numbers are used later, as they will be more impactful.

  constructor(
    name: string,
    description: string,
    targetSelf: boolean,
    instantUse: boolean,
    priority: number,
  ) {
    this.name = name;
    this.description = description;
    this.targetSelf = targetSelf;
    this.instantUse = instantUse;
    this.priority = priority;
  }

  //child classes will need to implement this powerup method
  //this method should just take in the current rpsMatch, as this will contain all the info needed. such as the players, and the players actions.
  abstract usePowerup(rpsMatch: RpsMatch, p1Activate: boolean): void;
}
