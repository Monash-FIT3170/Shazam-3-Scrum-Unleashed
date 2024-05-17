//Very basic player class, can be expanded if needed
//Author: Team Buddy (4), Aaron Abbott 32520441

import { Action, PlayerAttributes } from "../../../types/types";

export default class Player implements PlayerAttributes {
  public userID: string;
  public name: string;
  public currentView: string;
  //private abilities: Ability[];
  //the winstreak is how many DUELS a player has won in a row. not the matches.
  public winstreak: number;
  public winstreakHigh: number;
  public numSpectators: number;
  public isBot: boolean;
  public inGamePoints: number;
  public actionChoice: Action;

  constructor(userID: string, name: string, isBot: boolean) {
    this.userID = userID;
    this.name = name;

    //by default the player is viewing their own view
    this.currentView = this.userID;
    //this.abilities = [];
    this.winstreak = 0;
    this.winstreakHigh = 0;
    this.numSpectators = 0;
    this.isBot = isBot;
    this.inGamePoints = 0;
    this.actionChoice = "NONE";
  }

  //getters
  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.userID;
  }
  public getWinstreak(): number {
    return this.winstreak;
  }
  public getNumSpectators(): number {
    return this.numSpectators;
  }
  public getIsBot(): boolean {
    return this.isBot;
  }
  public getCurrentView(): string {
    return this.currentView;
  }
  public getChoice(): Action {
    return this.actionChoice;
  }
  public getInGamePoints(): number {
    return this.inGamePoints;
  }

  //setters

  public setWinstreak(winstreak: number) {
    this.winstreak = winstreak;
  }
  public setNumSpectators(numSpectators: number) {
    this.numSpectators = numSpectators;
  }
  public setIsBot(isBot: boolean) {
    this.isBot = isBot;
  }
  public setCurrentView(currentView: string) {
    this.currentView = currentView;
  }
  public setChoice(choice: Action) {
    this.actionChoice = choice;
  }

  //additional methods
  public incrementWinstreak() {
    this.winstreak++;
    if (this.winstreak > this.winstreakHigh) {
      this.winstreakHigh = this.winstreak;
    }
  }

  public resetWinstreak() {
    this.winstreak = 0;
  }

  public resetIngamePoints() {
    this.inGamePoints = 0;
  }

  public incrementNumSpectators(newSpec: number) {
    this.numSpectators += newSpec;
  }
  public decrementNumSpectators(lessSpec: number) {
    this.numSpectators -= lessSpec;
  }

  //currently the winsteak tracks duels won, not matches.
  public wonDuel() {
    this.incrementWinstreak();
  }
  public lostDuel() {
    this.resetWinstreak();
  }

  public lostMatch(winId: string) {
    this.resetWinstreak();
    //winID is the id of the winner
    this.setCurrentView(winId);
  }

  //get the view infomation, which is returned as [playerID: number, spectating: boolean] so the spectating flag is true if they are currently spectating
  public getViewInfo(): [string, boolean] {
    return [this.currentView, this.userID != this.currentView];
  }

  public incrementInGamePoints() {
    this.inGamePoints += 1;
  }
}
