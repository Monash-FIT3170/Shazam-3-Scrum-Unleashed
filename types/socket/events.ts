/**
 * Defines all the events that will be sent between the Clients and Server
 *
 * Please add any new events, data or fix any formatting
 */

import Player from "../../server/model/player";
import {Action, DuelResult} from "../types";

/**
 * Add any new Event Categories to this
 */
export interface Events extends HostToServerEvents, PlayerToServerEvents, ServerToHostEvents, ServerToPlayerEvents {
}

interface HostToServerEvents {
    create_game: (/*TODO*/) => void,
    start_game: (gameCode: string) => void,
    kick_player: (gameCode: string, playerName: Player) => void,

}

interface PlayerToServerEvents {
    join_game: (gameCode: string, playerName: string) => void,
    leave_game: (gameCode: string, player: Player) => void,
    choose_action: (gameCode: string, playerName: string,
                    roomCode: number, action: Action) => void,
}

interface ServerToHostEvents {
    game_created: (gameCode: string, qrCode: any) => void,
    player_has_joined: (player: Player) => void,
    player_has_left: (player: Player) => void,
    game_started: (/*TODO*/ tournamentBracket: any) => void,
    round_results: (/*TODO*/ tournamentBracket: any) => void,
    tournament_results: (/*TODO*/ tournamentBracket: any) => void
}

interface ServerToPlayerEvents {
    joined_game: (success: boolean, player: Player) => void,
    join_this_room: (/*TODO*/) => void,
    duel_results: (result: DuelResult, player1Action: Action, player2Action: Action) => void,
    match_results: (winner: Player, loser: Player) => void
}