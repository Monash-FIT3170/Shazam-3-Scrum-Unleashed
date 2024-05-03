import "./App.css";
import JoinGame from "./pages/JoinGame.tsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Events } from "../../shared/types/socket/events.ts";
import Home from "./pages/Home.tsx";
import HostGame from "./pages/HostGame.tsx";
import {
  BASE_PATH,
  HOST_GAME_PATH,
  HOME_PATH,
  JOIN_GAME_PATH, GAME_LOBBY_PATH
} from "./pages/pagePaths.ts";
import GameLobby, {newGameLoader} from "./pages/GameLobby.tsx";


export const socket: Socket<Events> = io("http://localhost:3010");

function App() {
  return (
      <div>
        <RouterProvider router={router}/>
      </div>
  );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={BASE_PATH}>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={JOIN_GAME_PATH} element={<JoinGame />} />
          <Route path={HOST_GAME_PATH} element={<HostGame />} />
          <Route path={GAME_LOBBY_PATH} element={<GameLobby />} loader={newGameLoader}/>
        </Route>
    )
);

export default App;
