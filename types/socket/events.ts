/**
 * Defines all the events that will be sent between the Clients and Server
 *
 * Please add any new events, data or fix any formatting
 */

import { Action, PlayerAttributes, ReactionData } from "../types";

/**
 * Add any new Event Categories to this
 */
export interface Events
  extends HostToClientEvents,
    PlayerToServerEvents,
    ServerToHostEvents,
    ServerToPlayerEvents {}

interface HostToClientEvents {
  SESSION_INFO: (sessionID: string, userID: string) => void;
  TOURNAMENT_COMPLETE: (playerName: string) => void;
}

interface PlayerToServerEvents {
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
  PLAYERS_UPDATE: (players: PlayerAttributes[]) => void;
}

interface ServerToPlayerEvents {
  MATCH_INFO: (
    players: PlayerAttributes[],
    isDuelComplete: boolean,
    winnerUserID: string | null
  ) => void;
  REACTION_ADDED: (reaction: ReactionData) => void;
}
