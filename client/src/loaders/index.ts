import { ReactRotuterRequest } from "../types/reactRouter";

export interface NewGameLoaderProps {
  request: ReactRotuterRequest;
}

export const newGameLoader = async ({ request }: NewGameLoaderProps) => {
  const url = new URL(request.url);

  const hostName = url.searchParams.get("name");
  const data = await fetch("http://localhost:3010/create-game", {
    method: "POST",
    body: JSON.stringify({ hostName: hostName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};
