import { useNavigate } from "react-router-dom";
import DisplayLogo from "../components/DisplayLogo";
import { HOST_GAME_PATH, JOIN_GAME_PATH } from "./PagePaths.ts";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <div className="w-screen h-12 mt-8">
        <button
          onClick={() => navigate(JOIN_GAME_PATH)}
          className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full"
        >
          Join Game
        </button>
      </div>
      <div className="w-screen h-12 mt-4">
        <button
          onClick={() => navigate(HOST_GAME_PATH)}
          className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full"
        >
          Host Game
        </button>
      </div>
    </div>
  );
};

export default Home;
