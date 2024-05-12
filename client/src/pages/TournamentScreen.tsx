import DisplayLogo from "../components/DisplayLogo";
import PlayerCard from "../components/PlayerCard";
import Player from "../../../server/model/actors/player"

const TournamentScreen = () => {
  // get the current player list
  // placeholder player
  const player = new Player("1", "abc", 1, false);

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <h1 className="text-white font-bold mt-6 uppercase">
        Tournament
        <PlayerCard count={1} player={player}/>
      </h1>
    </div>
  )
}

export default TournamentScreen;