import { ReactRouterRequest } from "../types";
import { GAME_LOBBY_PATH, JOIN_GAME_PATH } from "../pages/pagePaths.ts";
import QRCode from "qrcode";

export interface LoaderProps {
  request: ReactRouterRequest;
}

export const newGameLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);

  const gameCode = url.searchParams.get("gameCode");

  let qrCode: string = "";

  QRCode.toDataURL(
    url.href.replace(GAME_LOBBY_PATH, JOIN_GAME_PATH),
    async (error, data) => {
      if (error) return console.log("error occurred");
      qrCode = data;
    },
  );

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
