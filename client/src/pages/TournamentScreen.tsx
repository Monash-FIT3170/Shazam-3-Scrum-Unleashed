import DisplayLogo from "../components/DisplayLogo";
import PlayerCard from "../components/PlayerCard";
// import Player from "../../../server/model/actors/player";
import { socket } from "../App";
import { useState } from "react";
import { PlayerAttributes } from "../../../types/types";

const TournamentScreen = () => {
  // create a list of players for further use
  const [players, setPlayers] = useState(new Array<PlayerAttributes>());

  // get the list of players emitted from the server
  socket.on("GAME_START", (players) => {
    console.log(players);
    console.log("Game Started");
    // change the player list to the new player list
    setPlayers(players);
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
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default TournamentScreen;
