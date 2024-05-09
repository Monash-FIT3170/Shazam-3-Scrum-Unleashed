import DisplayLogo from "../components/DisplayLogo";
import WinnerPlayer from "../components/WinnerPlayer";


const PlayerScreen = () => {
  return (
    <div style={{ overflow: "hidden", paddingTop: "50px" }}>
      <div>
        <DisplayLogo />
      </div>
      <div style={{ marginTop: "20px" }}>
        <WinnerPlayer />
      </div>
    </div>
  );
};

export default PlayerScreen;
