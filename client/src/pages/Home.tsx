import { JOIN_GAME_PATH, CREATE_TOURNAMENT_PATH } from "./pagePaths.ts";
import ButtonComponent from "../components/buttons/ButtonComponent.tsx";
import BorderedButtonComponent from "../components/buttons/BorderedButtonComponent.tsx";
import DisplayLogo from "../components/DisplayLogo.tsx";
import Lightning from "../assets/logo/Lightning.svg"

const Home = () => {
  return (
  <div>
    <div className="h-64 md:h-80 lg:h-96 mt-20">
      <DisplayLogo />
    </div>
    <div className="flex flex-col justify-center items-center mt-20">
      <ButtonComponent
        linkPath={JOIN_GAME_PATH}
        text={"JOIN GAME"}
      />
      <div className="hidden lg:block">
        <BorderedButtonComponent
          linkPath={CREATE_TOURNAMENT_PATH}
          text={"CREATE GAME"}
        />
      </div>
    </div>

    <div className="flex flex-col justify-center items-center mt-20 text-white text-2xl font-semibold block lg:hidden"> {/* Increased mt-10 to mt-20 */}
      <span className="font-sans mb-5">Become the</span>
      <span className="font-sans mb-10 text-3xl">Rock Paper Scissors</span>
      <div className="flex items-center justify-center">
        <img src={Lightning} className="w-10" alt="Lightning Icon"></img>
        <span className="text-yellow-400 text-5xl font-bold">Champion!</span>
        <img src={Lightning} className="w-10" alt="Lightning Icon"></img>
      </div>
    </div>
  </div>

  );
};

export default Home;
