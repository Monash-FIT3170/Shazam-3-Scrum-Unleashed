/**
 * Defines all the events that will be sent between the Clients and Server
 *
 * Please add any new events, data or fix any formatting
 */

import Player from "model/actors/player";
import { Action, DuelResult, PlayerAttributes } from "../types";
import { JoinErrorCode } from "./eventArguments";

/**
 * Add any new Event Categories to this
 */
export interface Events
  extends HostToClientEvents,
    HostToServerEvents,
    PlayerToServerEvents,
    ServerToHostEvents,
    ServerToPlayerEvents {}

interface HostToClientEvents {
  SESSION_INFO: (sessionID: string, userID: string) => void;
}

interface HostToServerEvents {
  CREATE_TOURNAMENT: (
    duelPerMatch: number,
    duelTime: number,
    matchTime: number
  ) => void;
  START_TOURNAMENT: (gameCode: string) => void;
  KICK_PLAYER: (gameCode: string, playerName: PlayerAttributes) => void;
  // ALLOCATE_PLAYERS: (gameCode: string) => void,
}

interface PlayerToServerEvents {
  JOIN_TOURNAMENT: (gameCode: string, playerName: string) => void;
  LEAVE_GAME: (gameCode: string, player: PlayerAttributes) => void;
  CHOOSE_ACTION: (
    gameCode: string,
    playerName: string,
    roomCode: number,
    action: Action
  ) => void;
}

interface ServerToHostEvents {
  TOURNAMENT_CREATED: (gameCode: string) => void;
  PLAYER_HAS_JOINED: (player: PlayerAttributes) => void;
  PLAYER_HAS_LEFT: (player: PlayerAttributes) => void;
  TOURNAMENT_STARTED: (/*TODO*/) => void;
  ROUND_RESULTS: (/*TODO*/) => void;
  TOURNAMENT_RESULTS: (/*TODO*/) => void;
}

interface ServerToPlayerEvents {
  JOINED_GAME: (joinErrorCode: JoinErrorCode) => void;
  DUEL_RESULTS: (
    result: DuelResult,
    player1Action: Action,
    player2Action: Action
  ) => void;
  MATCH_STARTED: (players: Player[]) => void;
  MATCH_INFO: (players: Player[]) => void;
  MATCH_RESULTS: (winner: PlayerAttributes, loser: PlayerAttributes) => void;
}
