import DisplayLogo from "../components/DisplayLogo";
import PlayerCard from "../components/PlayerCard";
import Player from "../../../server/model/actors/player";
import { socket } from "../App";
import { useState } from "react";

const TournamentScreen = () => {
  // create a list of players for further use
  const [players, setPlayers] = useState(new Array<Player>());

  // get the list of players emitted from the server
  socket.on("GAME_START", (players) => {
    console.log(players);
    console.log("Game Started");
    // map the player attributes to the player class
    const newPlayers = players.map((player) => {
      return new Player(player.socketId, player.name, player.id, player.isBot);
    });
    // change the player list to the new player list
    setPlayers(newPlayers);
  });

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
