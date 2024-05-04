import { ReactRotuterRequest } from "../types";

export interface NewGameLoaderProps {
  request: ReactRotuterRequest;
}

export const newGameLoader = async ({ request }: NewGameLoaderProps) => {
  const url = new URL(request.url);

  const gameCode = url.searchParams.get("gameCode");

  return { gameCode };
};

export const joinedGameLoader = async ({ request }: NewGameLoaderProps) => {
  const url = new URL(request.url);

  const playerName = url.searchParams.get("playerName");

  return { playerName };
};
