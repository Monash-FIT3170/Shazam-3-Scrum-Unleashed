import { ReactRouterRequest } from "../types";

export interface LoaderProps {
  request: ReactRouterRequest;
}

export const newGameLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const gameCode = url.searchParams.get("gameCode");

  return { gameCode };
};

export const joinGameLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  // TODO - Verify game code is of valid format
  const gameCode = url.searchParams.get("gameCode");
  if (!gameCode) {
    return "";
  }
  return gameCode;
};

export const joinedGameLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const playerName = url.searchParams.get("playerName");

  return { playerName };
};

export const tournamentScreenLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const gameCode = url.searchParams.get("gameCode");

  return gameCode;
}
