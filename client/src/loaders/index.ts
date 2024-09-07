import { JOIN_GAME_PATH, PATH_NOT_FOUND_PATH } from "../pages/pagePaths";
import { ReactRouterRequest } from "../types";

export interface LoaderProps {
  request: ReactRouterRequest;
}

export const tournamentLobbyLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const tournamentCode = url.searchParams.get("tournamentCode");
  localStorage.setItem("tournamentCode", tournamentCode ?? "");
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

export const joinTournamentRedirectLoader = async ({
  request,
}: LoaderProps) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\//, "");
  const codeMatch = path.match(/(^\d{6}$)/);

  if (codeMatch) {
    window.location.href = `/${JOIN_GAME_PATH}?tournamentCode=${codeMatch[1]}`;
  } else {
    window.location.href = `${PATH_NOT_FOUND_PATH}`;
  }

  return {};
};

export const playerScreenLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const loadedPlayerName = url.searchParams.get("playerName");
  const loadedTournamentCode = url.searchParams.get("tournamentCode");
  localStorage.setItem("tournamentCode", loadedTournamentCode ?? "");

  return { loadedTournamentCode, loadedPlayerName };
};
