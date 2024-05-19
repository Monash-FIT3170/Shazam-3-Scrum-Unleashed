import "./App.css";
import JoinGame from "./pages/JoinGame.tsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Events } from "../../types/socket/events.ts";
import CreateGame from "./pages/CreateGame.tsx";
import {
  BASE_PATH,
  CREATE_GAME_PATH,
  HOME_PATH,
  JOIN_GAME_PATH,
  GAME_LOBBY_PATH,
  PLAYER_SCREEN,
  // TOURNAMENT_SCREEN,
} from "./pages/pagePaths.ts";
import GameLobby from "./pages/GameLobby.tsx";
import { joinGameLoader, newGameLoader, playerScreenLoader } from "./loaders";
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
export const socket: Socket<Events> = io("http://localhost:3010", {
  autoConnect: false,
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={BASE_PATH}>
      <Route path={HOME_PATH} element={<Home />} />
      <Route
        path={JOIN_GAME_PATH}
        element={<JoinGame />}
        loader={joinGameLoader}
      />
      <Route path={CREATE_GAME_PATH} element={<CreateGame />} />
      <Route
        path={GAME_LOBBY_PATH}
        element={<GameLobby />}
        loader={newGameLoader}
      />
      <Route
        path={PLAYER_SCREEN}
        element={<PlayerScreen />}
        loader={playerScreenLoader}
      />
      {/* creating a route for the tournament screen */}
      {/* <Route path={TOURNAMENT_SCREEN} element={<TournamentScreen />} /> */}
    </Route>,
  ),
);

function App() {
  const cookieStrings = document.cookie.split("=");

  if (cookieStrings[0] === "sessionID") {
    socket.auth = { sessionID: cookieStrings[1] };
  }
  socket.connect();

  socket.on("SESSION_INFO", (sessionID, userID) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // save the ID of the user
    socket.userID = userID;
    document.cookie = `sessionID=${sessionID};`;
  });

  socket.on("disconnect", function () {
    // Do stuff (probably some jQuery)
  });

  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
