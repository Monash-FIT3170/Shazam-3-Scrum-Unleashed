/**
 * Defines all the events that will be sent between the Clients and Server
 *
 * Please add any new events, data or fix any formatting
 */

import Player from "../../server/model/actors/player";
import {Action, DuelResult} from "../types";

/**
 * Add any new Event Categories to this
 */
export interface Events extends HostToServerEvents, PlayerToServerEvents, ServerToHostEvents, ServerToPlayerEvents {
}

interface HostToServerEvents {
    CREATE_GAME: (hostName: string) => void,
    START_GAME: (gameCode: string) => void,
    KICK_PLAYER: (gameCode: string, playerName: Player) => void,

}

interface PlayerToServerEvents {
    JOIN_GAME: (gameCode: string, playerName: string) => void,
    LEAVE_GAME: (gameCode: string, player: Player) => void,
    CHOOSE_ACTION: (gameCode: string, playerName: string,
                    roomCode: number, action: Action) => void,
}

interface ServerToHostEvents {
    GAME_CREATED: (gameCode: string, qrCode: any) => void,
    PLAYER_HAS_JOINED: (player: Player) => void,
    PLAYER_HAS_LEFT: (player: Player) => void,
    GAME_START: (/*TODO*/) => void,
    ROUND_RESULTS: (/*TODO*/) => void,
    TOURNAMENT_RESULTS: (/*TODO*/) => void
}

interface ServerToPlayerEvents {
    INVALID_GAME_CODE: () => void,
    JOINED_GAME: (player: Player) => void,
    JOIN_THIS_ROOM: (/*TODO*/) => void,
    DUEL_RESULTS: (result: DuelResult, player1Action: Action, player2Action: Action) => void,
    MATCH_RESULTS: (winner: Player, loser: Player) => void
}