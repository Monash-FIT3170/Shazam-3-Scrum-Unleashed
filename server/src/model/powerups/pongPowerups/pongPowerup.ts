import { PongMatch } from "src/model/matches/pongMatch";

export interface PongPowerup {
  activate(match: PongMatch): void;
  name: string;
}
