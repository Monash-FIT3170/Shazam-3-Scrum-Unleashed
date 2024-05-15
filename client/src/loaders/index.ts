import { ReactRouterRequest } from "../types";
import { GAME_LOBBY_PATH, JOIN_GAME_PATH } from "../pages/pagePaths.ts";

export interface LoaderProps {
  request: ReactRouterRequest;
}

export const newGameLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const gameCode = url.searchParams.get("gameCode");

  // GET request for QR Code (from https://goqr.me/api/doc/)
  const qrCode: Blob = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url.href.replace(GAME_LOBBY_PATH, JOIN_GAME_PATH)}`,
  ).then((res) => {
    return res.blob();
  });

  return { gameCode, qrCode };
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
