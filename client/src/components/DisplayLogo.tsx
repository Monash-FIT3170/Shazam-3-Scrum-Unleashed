import logo from "../assets/logo/LogoWithText.svg";

const DisplayLogo = () => {
  return (
    <div className="flex justify-center transform size-full">
      <img src={logo} alt="Rock, Paper, Shazam Logo" />
    </div>
  );
};

export default DisplayLogo;
