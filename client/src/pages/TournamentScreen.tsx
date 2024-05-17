import DisplayLogo from "../components/DisplayLogo";
import PlayerCard from "../components/PlayerCard";
import Player from "../../../server/model/actors/player";

const TournamentScreen = () => {
  // get the current player list
  // placeholder players
  const player = new Player("1", "mmmmmmmm", false);
  const player2 = new Player("1", "wwwwwwww", false);
  const players = [
    player,
    player2,
    new Player("1", "wwwwwwww", false),
    new Player("1", "wwwwwwww", false),
    new Player("1", "wwwwwwww", false),
    new Player("1", "wwwwwwww", false),
    new Player("1", "wwwwwwww", false),
    new Player("1", "wwwwwwww", false),
    new Player("1", "wwwwwwww", false),
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
        {players.map((player, index) => (
          <PlayerCard key={player.getId()} player={player} cardNum={index} />
        ))}
      </div>
    </div>
  );
};

export default TournamentScreen;
