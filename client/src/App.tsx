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
  TOURNAMENT_SCREEN,
} from "./pages/pagePaths.ts";
import GameLobby from "./pages/GameLobby.tsx";
import { joinedGameLoader, joinGameLoader, newGameLoader, tournamentScreenLoader } from "./loaders";
import PlayerScreen from "./pages/PlayerScreen.tsx";
import TournamentScreen from "./pages/TournamentScreen.tsx";
import Home from "./pages/Home.tsx";

export const socket: Socket<Events> = io("http://localhost:3010");

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
        loader={joinedGameLoader}
      />
      {/* creating a route for the tournament screen */}
      <Route 
        path={TOURNAMENT_SCREEN} 
        element={<TournamentScreen />} 
        loader={tournamentScreenLoader} 
      />
    </Route>,
  ),
);

function App() {
  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
