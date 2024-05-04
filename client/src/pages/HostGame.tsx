import DisplayLogo from "../components/DisplayLogo";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { GAME_LOBBY_PATH } from "./pagePaths.ts";
import { socket } from "../App.tsx";

const HostGame = () => {
  const navigate = useNavigate();
  const [hostName, setHostName] = useState("");

  const [loading, setLoading] = useState(false);
  const createGame = () => {
    socket.emit("CREATE_GAME", hostName);
    setLoading(true);
  };

  const [gameCode, setGameCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  socket.on("GAME_CREATED", (gameCode, qrCode) => {
    // joined the room etc
    setGameCode(gameCode);
    setQrCode(qrCode);
  });

  useEffect(() => {
    if (loading) {
      console.log("fafa");
      navigate(`../${GAME_LOBBY_PATH}?gameCode=${gameCode}&qrCode=${qrCode}`);
    }
  }, [gameCode, qrCode]);

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>

      <div>
        <h1 className="text-white font-bold mt-6 uppercase"> name</h1>
        <div className="w-screen">
          <input
            type="text"
            placeholder="HOST NAME"
            className="bg-primary-dark text-white rounded-xl w-1/3 h-10 mt-4 border-2 border-white pl-2"
            onChange={(event) => {
              setHostName(event.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="w-screen h-12 mt-8">
        {loading ? (
          <button className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full">
            Loading...
          </button>
        ) : (
          <button
            className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full"
            onClick={createGame}
          >
            Create Game
          </button>
        )}
      </div>
    </div>
  );
};
export default HostGame;
