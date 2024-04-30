import "./App.css";
import JoinRoom from "./pages/JoinRoom";
import { io, Socket } from "socket.io-client";
import { Events } from "../../types/socket/events.ts";

export const socket: Socket<Events> = io("http://localhost:3010");

function App() {
  return (
    <div className="flex items-center justify-center w-screen mt-4">
      <div>
        <JoinRoom />
      </div>
    </div>
  );
}

export default App;
