/**
 * Defines all the events that will be sent between the Clients and Server
 *
 * Please add any new events, data or fix any formatting
 */
import {Player} from "../frontend/src/classes/player";


// Some Enums that probably are better suited somewhere else
// Also can be completely changed
enum DuelResult {
    Draw = 0,
    Player1Wins = 1,
    Player2Wins = 2
}

enum Action {
    Rock = "ROCK",
    Paper = "PAPER",
    Scissors = "SCISSORS"
}


// *******************************************
//            Client to Server Events
// *******************************************

// ********************************
//     Host to Server Events
// ********************************
export const CREATE_NEW_GAME: string = "create_new_game";

export interface CreateNewGameData {
    // nothing I think
}


export const START_GAME: string = "start_game";

export interface StartGameData {
    gameCode: string;
}


export const KICK_PLAYER: string = "kick_player";

export interface KickPlayerData {
    gameCode: string,
    playerName: Player;
}


// ********************************
//     Player to Server Events
// ********************************
export const JOIN_GAME: string = "join_game";

export interface JoinGameData {
    gameCode: string,
    playerName: string;
}


export const LEAVE_GAME: string = "leave_game";

export interface LeaveGameData {
    gameCode: string,
    player: Player;
}


export const CHOOSE_ACTION: string = "choose_action";

export interface ChooseActionData {
    gameCode: string,
    playerName: string,
    roomCode: number,
    action: Action;
}


// *******************************************
//            Server to Client Events
// *******************************************

// ********************************
//     Server to Host Events
// ********************************
export const GAME_CREATED: string = "game_created";

export interface GameCreatedData {
    gameCode: string,
    qrCode: any; // If we want to eventually implement this
}


export const PLAYER_HAS_JOINED: string = "player_has_joined_game";

export interface PlayerJoinedData {
    player: Player;
}


export const PLAYER_HAS_LEFT: string = "player_has_left_game";

export interface PlayerLeftData {
    player: Player;
}


export const GAME_STARTED: string = "game_started";

export interface GameStartedData {
    // TODO not really sure
    tournamentBracket: any;
}


export const ROUND_RESULTS: string = "round_results";

export interface RoundResultsData {
    // TODO not really sure
    tournamentBracket: any;
}

export const TOURNAMENT_RESULTS: string = "tournament_results";

export interface TournamentResultsData {
    // TODO not really sure
    tournamentBracket: any;
}

// ********************************
//     Server to Player Events
// ********************************
export const JOINED_GAME: string = "joined_game";

export interface JoinedGameData {
    success: boolean,
    player: Player;
}


export const JOIN_THIS_ROOM: string = "join_this_room ";

export interface JoinedRoomData {
    room: JoinedGameData;
}


export const DUEL_RESULTS: string = "duel_results";

export interface DuelResultsData {
    result: DuelResult,
    player1Action: Action,
    player2Action: Action;
}


export const MATCH_RESULTS: string = "duel_results";

export interface MatchResultsData {
    winner: Player;
    loser: Player;
}