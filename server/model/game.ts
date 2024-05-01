import Player from "./actors/player";
import Host from "./actors/host";


export default class Game {

    private host: Host;
    private players: Array<Player>;

    constructor(host: Host) {
        this.host = host;
        this.players = new Array<Player>();
    }


    get HostSocketID(): string {
        return this.host.socketID;
    }
}