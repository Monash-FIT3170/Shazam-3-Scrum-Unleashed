import { Link } from "react-router-dom";
import DisplayLogo from "../components/Other/DisplayLogo.tsx";
import { CREATE_GAME_PATH, JOIN_GAME_PATH } from "./pagePaths.ts";

const Home = () => {
  return (
    <div>
      <div>
        <DisplayLogo />
      </div>

      <div className="w-screen h-12 mt-8">
        <Link to={JOIN_GAME_PATH}>
          <button className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full">
            Join Game
          </button>
        </Link>
      </div>
      <div className="w-screen h-12 mt-4">
        <Link to={CREATE_GAME_PATH}>
          <button className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full">
            Host Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
