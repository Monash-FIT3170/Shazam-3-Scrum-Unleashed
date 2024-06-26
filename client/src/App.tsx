import "./App.css";
import JoinTournament from "./pages/JoinTournament.tsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Events } from "../../types/socket/events.ts";
import CreateTournament from "./pages/CreateTournament.tsx";
import {
  CREATE_TOURNAMENT_PATH,
  HOME_PATH,
  JOIN_GAME_PATH,
  GAME_LOBBY_PATH,
  PLAYER_SCREEN,
  // TOURNAMENT_SCREEN,
} from "./pages/pagePaths.ts";
import GameLobby from "./pages/TournamentLobby.tsx";
import {
  joinTournamentLoader,
  tournamentLobbyLoader,
  playerScreenLoader,
} from "./loaders";
import PlayerScreen from "./pages/PlayerScreen.tsx";
// import TournamentScreen from "./pages/TournamentScreen.tsx";
import Home from "./pages/Home.tsx";

declare module "socket.io-client" {
  interface Socket {
    sessionID: string;
    userID: string;
  }
}

// TODO: We need to make this an environment variable
export const socket: Socket<Events> = io(
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3010",
  {
    autoConnect: false,
  },
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"}>
      <Route path={HOME_PATH} element={<Home />} />
      <Route
        path={JOIN_GAME_PATH}
        element={<JoinTournament />}
        loader={joinTournamentLoader}
      />
      <Route path={CREATE_TOURNAMENT_PATH} element={<CreateTournament />} />
      <Route
        path={GAME_LOBBY_PATH}
        element={<GameLobby />}
        loader={tournamentLobbyLoader}
      />
      <Route
        path={PLAYER_SCREEN}
        element={<PlayerScreen />}
        loader={playerScreenLoader}
      />
    </Route>,
  ),
);

function App() {
  let sessionIdCookie = "";
  let tournamentCodeCookie = "";
  const cookieStrings = document.cookie.split(";");
  for (const cookie of cookieStrings) {
    if (cookie.startsWith("sessionID")) {
      sessionIdCookie = cookie.split("=")[1];
    } else if (cookie.trim().startsWith("tournamentCode")) {
      tournamentCodeCookie = cookie.split("=")[1];
    }
  }

  socket.auth = {
    sessionID: sessionIdCookie,
    tournamentCode: tournamentCodeCookie,
  };

  socket.connect();

  socket.on("SESSION_INFO", (sessionID, userID) => {
    socket.auth = { sessionID };
    socket.userID = userID;
    document.cookie = `sessionID=${sessionID};`;
  });

  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
