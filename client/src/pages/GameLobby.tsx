import DisplayLogo from "../components/DisplayLogo";

import { useLoaderData } from "react-router-dom";

const GameLobby = () => {
  const gameData = useLoaderData() as { gameCode: string; qrCode: string };

  // const [mapState, setMapState] = useState(new Map<string, PlayerAttributes>());
  //
  // const updateMap = (key: string, value: PlayerAttributes) => {
  //     setMapState(map => new Map(map.set(key, value)));
  // }
  // useEffect(() => {
  //     socket.on("PLAYER_HAS_JOINED", (player) => {
  //
  //         console.log("game trying to be created")
  //
  //         if (mapState.has(player.socketId)) {
  //             // shouldnt happen, but will have to add stuff to prevent it from happening
  //         } else {
  //             updateMap(player.socketId, player);
  //         }
  //     })
  // }, [socket]);

  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <h1 className="text-white font-bold mt-6 uppercase">
        Game Code : {gameData.gameCode}
      </h1>
    </div>
  );
};

export default GameLobby;
