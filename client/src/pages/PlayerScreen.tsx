import DisplayLogo from "../components/DisplayLogo";
import WinnerPlayer from "../components/WinnerPlayer";
//import EndTournament from "../components/EndTournament";

// For testing purposes I've added both componenets to Player Screen.
// Components will be conditionally rendered based on the game state.

const PlayerScreen = () => {
  return (
    <div className="overflow-hidden pt-12">
      <div>
        <DisplayLogo />
      </div>
      {/* <div className="mt-5">
        <EndTournament player={"PLAYER X"}/> 
      </div> */}
      <div className="mt-5">
        <WinnerPlayer />
      </div>
    </div>
  );
};

export default PlayerScreen;
