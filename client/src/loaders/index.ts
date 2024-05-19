import { ReactRouterRequest } from "../types";

export interface LoaderProps {
  request: ReactRouterRequest;
}

export const tournamentLobbyLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const tournamentCode = url.searchParams.get("tournamentCode");
  return { tournamentCode };
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

export const playerScreenLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const loadedPlayerName = url.searchParams.get("playerName");
  const loadedTournamentCode = url.searchParams.get("tournamentCode");

  return { loadedTournamentCode, loadedPlayerName };
};
