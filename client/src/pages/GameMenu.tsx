import BorderedButtonComponent from "../components/buttons/BorderedButtonComponent.tsx";
import LargeButton from "../components/buttons/LargeButton";
import RockPaperPong from "../assets/logo/RockPaperPong.svg";
import LogoForMenu from "../assets/logo/LogoForMenu.svg";
import ButtonComponent from "../components/buttons/BorderedButtonComponent.tsx";

const GameMenu = () => {
  return (
    <div className="px-8">
      <div className="fixed top-0 md:right-20 right-5">
        <ButtonComponent linkPath="/" text={"Back"} />
      </div>
      <div className="flex justify-center mt-28 space-x-20">
        <LargeButton linkPath="/create-tournament" image={RockPaperPong} />
        <LargeButton linkPath="/create-tournament" image={LogoForMenu} />
      </div>
      <div className="mt-20">
        <BorderedButtonComponent
          linkPath="/create-tournament"
          text={"MASHUP / PARTY MODE"}
          large={true}
        />
      </div>
    </div>
  );
};

export default GameMenu;
