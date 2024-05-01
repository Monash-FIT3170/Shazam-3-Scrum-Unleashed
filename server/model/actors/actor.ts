export default abstract class Actor {

    private _socketID: string;
    private _name: string;

    constructor(socketID: string, name: string) {
        this._socketID = socketID;
        this._name = name;
    }

    get socketID(): string {
        return this._socketID;
    }

    get name(): string {
        return this._name;
    }


}