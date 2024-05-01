import "./App.css";
import JoinGame from "./pages/JoinGame.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Events } from "../../types/socket/events.ts";
import Home from "./pages/Home.tsx";
import HostGame from "./pages/HostGame.tsx";
import {
  BASE_PATH,
  HOST_GAME_PATH,
  HOME_PATH,
  JOIN_GAME_PATH
} from "./pages/pagePaths.ts";


export const socket: Socket<Events> = io("http://localhost:3010");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BASE_PATH}>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={JOIN_GAME_PATH} element={<JoinGame />} />
          <Route path={HOST_GAME_PATH} element={<HostGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
