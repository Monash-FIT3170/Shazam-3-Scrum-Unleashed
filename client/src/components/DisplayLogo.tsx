import logo from "../assets/LogoWithText.svg";

const DisplayLogo = () => {
  return (
    <div>
      <div className="flex justify-center transform scale-100 h-64 md:h-80 lg:h-96 mt-20">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default DisplayLogo;
