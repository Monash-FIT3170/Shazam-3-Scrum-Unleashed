//Very basic player class, can be expanded if needed
//Author: Team Buddy (4), Aaron Abbott 32520441
import { PlayerAttributes } from "../../../types/types";
import Actor from "./actor";

export default class Player extends Actor implements PlayerAttributes {
  public id: number;
  public currentView: number;
  //private abilities: Ability[];
  //the winstreak is how many DUELS a player has won in a row. not the matches.
  public winstreak: number;
  public winstreakHigh: number;
  public numSpectators: number;
  public isBot: boolean;
  public ingamePoints: number;

  constructor(name: string, socketId: string, id: number, isBot: boolean) {
    super(name, socketId);
    this.id = id;
    //by default the player is viewing their own view
    this.currentView = id;
    //this.abilities = [];
    this.winstreak = 0;
    this.winstreakHigh = 0;
    this.numSpectators = 0;
    this.isBot = isBot;
    this.ingamePoints = 0;
  }

  //getters
  public getId(): number {
    return this.id;
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
  public getCurrentView(): number {
    return this.currentView;
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
  public setCurrentView(currentView: number) {
    this.currentView = currentView;
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

  public lostMatch(winId: number) {
    this.resetWinstreak();
    //winID is the id of the winner
    this.setCurrentView(winId);
  }

  //get the view infomation, which is returned as [playerID: number, spectating: boolean] so the spectating flag is true if they are currently spectating
  public getViewInfo(): [number, boolean] {
    return [this.currentView, this.id != this.currentView];
  }

  public incrementIngamePoints() {
    this.ingamePoints += 1;
  }
}
