import "./App.css";
import JoinRoom from "./Pages/JoinRoom";
import {io} from "socket.io-client";


export const socket = io("http://localhost:3010");

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
