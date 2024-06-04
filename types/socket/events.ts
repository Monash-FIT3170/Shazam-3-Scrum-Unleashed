/**
 * Defines all the events that will be sent between the Clients and Server
 *
 * Please add any new events, data or fix any formatting
 */

import { Action, PlayerAttributes, ReactionData } from "../types";
import { JoinStatusCode } from "./eventArguments";

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
  TOURNAMENT_COMPLETE: (playerName: string) => void;
}

interface HostToServerEvents {
  CREATE_TOURNAMENT: (
    duelPerMatch: number,
    duelTime: number,
    matchTime: number
  ) => void;
  START_TOURNAMENT: (gameCode: string) => void;
  KICK_PLAYER: (gameCode: string, playerName: PlayerAttributes) => void;
}

interface PlayerToServerEvents {
  JOIN_TOURNAMENT: (gameCode: string, playerName: string) => void;
  LEAVE_GAME: (gameCode: string, player: PlayerAttributes) => void;
  CHOOSE_ACTION: (
    tournamentCode: string,
    playerUserID: string,
    action: Action
  ) => void;
  ADD_REACTION: (
    tournamentCode: string,
    reaction: ReactionData,
    spectatorID: string
  ) => void;
}

interface ServerToHostEvents {
  TOURNAMENT_CREATED: (gameCode: string) => void;
  PLAYERS_UPDATE: (players: PlayerAttributes[]) => void;
  ROUND_STARTED: (/*TODO*/) => void;
  ROUND_RESULTS: (/*TODO*/) => void;
}

interface ServerToPlayerEvents {
  JOINED_TOURNAMENT: (joinErrorCode: JoinStatusCode) => void;
  MATCH_INFO: (
    players: PlayerAttributes[],
    isDuelComplete: boolean,
    winnerUserID: string | null
  ) => void;
  REACTION_ADDED: (reaction: ReactionData) => void;
}
