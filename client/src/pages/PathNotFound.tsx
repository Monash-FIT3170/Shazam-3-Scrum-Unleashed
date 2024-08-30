import { JOIN_GAME_PATH } from "./pagePaths.ts";
import ButtonComponent from "../components/buttons/ButtonComponent.tsx";
import BorderedButtonComponent from "../components/buttons/BorderedButtonComponent.tsx";
import DisplayLogo from "../components/DisplayLogo.tsx";

const PathNotFound = () => {
  return (
    <div>
      <div className="h-32 md:h-40 lg:h-48 mt-20 ">
        <DisplayLogo />
      </div>
      <div className="text-white p-8">
        <h1 className="text-3xl font-bold pb-4">404 - Page Not Found</h1>
        <p className="text-xl">Did you try to join a game?</p>
      </div>
      <div className="mt-20">
        <ButtonComponent
          linkPath={"/" + JOIN_GAME_PATH}
          text={"JOIN GAME"}
        ></ButtonComponent>
        <BorderedButtonComponent
          linkPath={"/"}
          text={"GO TO HOME"}
        ></BorderedButtonComponent>
      </div>
    </div>
  );
};

export default PathNotFound;
