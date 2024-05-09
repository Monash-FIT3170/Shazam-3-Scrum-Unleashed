import DisplayLogo from "../components/DisplayLogo";
import WinnerPlayer from "../components/WinnerPlayer";
import EndTournament from "../components/EndTournament";

// For testing purposes I've added both componenets to Player Screen.
// Components will be conditionally rendered based on the game state.

const PlayerScreen = () => {
  return (
    <div style={{ overflow: "hidden", paddingTop: "50px" }}>
      <div>
        <DisplayLogo />
      </div>
      {/* <div style={{ marginTop: "20px" }}>
        <EndTournament player={"PLAYER X"}/> 
      </div> */}
      <div style={{ marginTop: "20px" }}>
        <WinnerPlayer />
      </div>
    </div>
  );
};

export default PlayerScreen;
