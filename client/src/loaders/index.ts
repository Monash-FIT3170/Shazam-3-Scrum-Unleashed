import { ReactRouterRequest } from "../types";

export interface LoaderProps {
  request: ReactRouterRequest;
}

export const tournamentLobbyLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const tournamentCode = url.searchParams.get("tournamentCode");
  return { tournamentCode };
};

export const joinTournamentLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const tournamentCode = url.searchParams.get("tournamentCode");
  if (!tournamentCode || !/^\d{6}$/.test(tournamentCode)) {
    return "";
  }
  return tournamentCode;
};

export const playerScreenLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const loadedPlayerName = url.searchParams.get("playerName");
  const loadedTournamentCode = url.searchParams.get("tournamentCode");
  localStorage.setItem("tournamentCode", loadedTournamentCode ?? "");

  return { loadedTournamentCode, loadedPlayerName };
};
