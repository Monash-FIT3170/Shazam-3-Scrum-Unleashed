import DisplayLogo from "../components/DisplayLogo";
import PlayerCard from "../components/PlayerCard";
import Player from "../../../server/model/actors/player";

const TournamentScreen = () => {
  // get the current player list
  // placeholder players
  const player = new Player("1", "mmmmmmmm", 1, false);
  const player2 = new Player("1", "wwwwwwww", 2, false);
  const players = [
    player,
    player2,
    new Player("1", "wwwwwwww", 2, false),
    new Player("1", "wwwwwwww", 3, false),
    new Player("1", "wwwwwwww", 4, false),
    new Player("1", "wwwwwwww", 5, false),
    new Player("1", "wwwwwwww", 6, false),
    new Player("1", "wwwwwwww", 7, false),
    new Player("1", "wwwwwwww", 8, false),
  ];

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <br></br>
      <div className="player-bar">
        <h1>Remaining Players: {players.length}</h1>
      </div>
      <br></br>
      <div className="player-list">
        {/* creating a playercard component for each player */}
        {players.map((player) => (
          <PlayerCard key={player.getId()} player={player} />
        ))}
      </div>
    </div>
  );
};

export default TournamentScreen;
