import Player from "../../../server/model/actors/player";

export interface ReactRotuterRequest {
  url: string;
}

// using this type allows the usage of props inside components
export type AppProps = {
  player: Player;
}