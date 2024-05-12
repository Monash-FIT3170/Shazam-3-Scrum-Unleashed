import DisplayLogo from "../components/DisplayLogo";
import PlayerCard from "../components/PlayerCard";
import Player from "../../../server/model/actors/player"

const TournamentScreen = () => {
  // get the current player list
  // placeholder players
  const player = new Player("1", "mmmmmmmm", 1, false);
  const player2 = new Player("1", "wwwwwwww", 2, false);
  const players = [player, player2];

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <h1 className="text-white font-bold mt-6 uppercase">
        Tournament
      </h1>
      <div className="player-list">
        {/* creating a playercard component for each player */}
        {players.map((player) => (
          <PlayerCard key={player.getId()} player={player} />
        ))}
      </div>
    </div>
  )
}

export default TournamentScreen;