import { JOIN_GAME_PATH, CREATE_TOURNAMENT_PATH } from "./pagePaths.ts";
import ButtonComponent from "../components/buttons/ButtonComponent.tsx";
import BorderedButtonComponent from "../components/buttons/BorderedButtonComponent.tsx";
import DisplayLogo from "../components/DisplayLogo.tsx";

const Home = () => {
  return (
    <div>
      <div className="h-64 md:h-80 lg:h-96 mt-20 ">
        <DisplayLogo />
      </div>
      <div className="mt-20">
        <ButtonComponent
          linkPath={JOIN_GAME_PATH}
          text={"JOIN GAME"}
        ></ButtonComponent>
        <BorderedButtonComponent
          linkPath={CREATE_TOURNAMENT_PATH}
          text={"CREATE GAME"}
        ></BorderedButtonComponent>
      </div>
    </div>
  );
};

export default Home;
