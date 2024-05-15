import ReactionOverlay from "../components/ReactionsOverlay/ReactionsOverlay";
import SemiCircle3dots from "../components/Other/semiCircle3dots";

const GameRoundScreen = () => {
  return (
    <>
      <ReactionOverlay />
      <div className="flex justify-center items-start">
        <div>
          <SemiCircle3dots variant="text" text="make your move" angle="180" />
          <h1 className="text-white"> TIMES RUNNING OUT!</h1>
        </div>

        {/*<h1 className="text-white font-bold mt-6 uppercase"> Game Code : {gameCode}</h1>*/}
      </div>
    </>
  );
};

export default GameRoundScreen;
