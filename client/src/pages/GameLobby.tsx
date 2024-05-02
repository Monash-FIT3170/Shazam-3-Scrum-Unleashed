import DisplayLogo from "../components/DisplayLogo";

import {socket} from "../App.tsx";
import {useLoaderData} from "react-router-dom";
import {Events} from "../../../types/socket/events.ts";
import {EventParams} from "@socket.io/component-emitter";


const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

function asyncEmit(emitEvent: keyof Events, receiveEvent: keyof Events, data : EventParams<Events, any>) :Promise<{ gameCode: string, qrCode: string }> {
    return new Promise(function (resolve, reject) {
        socket.emit(emitEvent, data);
        socket.on(receiveEvent, result => {
            console.log("game created")
            socket.off(receiveEvent);
            resolve(result);
        });
        setTimeout(reject, 2000);
    });
}

export const newGameLoader = async ({request}): Promise<{ gameCode: string, qrCode: string }> => {
    //await sleep(5000)

    const url = new URL(request.url);
    const hostName = url.searchParams.get("name");
    console.log(hostName)

    const data :{ gameCode: string, qrCode: string } = await asyncEmit("CREATE_GAME", "GAME_CREATED", hostName);
    console.log("finished " + data)
    console.log(typeof data)
    return data;
}

const GameLobby = () => {

    const gameData = useLoaderData() as { gameCode: string, qrCode: string };
    console.log(typeof gameData)
    console.log(typeof gameData.gameCode)
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
                <DisplayLogo/>
            </div>
            <h1 className="text-white font-bold mt-6 uppercase"> Game Code : {gameData}</h1>
        </div>
    );
};


export default GameLobby;
