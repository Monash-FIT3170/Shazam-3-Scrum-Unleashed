
import { HOST_GAME_PATH, JOIN_GAME_PATH } from "./pagePaths.ts";
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
            linkPath={HOST_GAME_PATH}
            text={"CREATE GAME"}
          ></BorderedButtonComponent>
        </div>
      </div>

  );
};

export default Home;
