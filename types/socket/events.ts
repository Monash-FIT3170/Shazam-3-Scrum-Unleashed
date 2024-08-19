/**
 * Defines all the events that will be sent between the Clients and Server
 *
 * Please add any new events, data or fix any formatting
 */

import {Action, PlayerAttributes, PongBallState, PongPaddleState, ReactionData} from "../types";
import {MatchType} from "./eventArguments";

/**
 * Add any new Event Categories to this
 */
export interface Events
  extends HostToClientEvents,
  PlayerToServerEvents,
  ServerToHostEvents,
  ServerToPlayerEvents { }

interface HostToClientEvents {
  SESSION_INFO: (sessionID: string, userID: string) => void;
  TOURNAMENT_COMPLETE: (playerName: string) => void;
}

interface PlayerToServerEvents {
  RPS_CHOOSE_ACTION: (
    tournamentCode: string,
    playerUserID: string,
    action: Action
  ) => void;

  ADD_REACTION: (
    tournamentCode: string,
    reaction: ReactionData,
    spectatorID: string
  ) => void;

  QUIT_TOURNAMENT: (
    tournamentCode: string,
  ) => void;

  PONG_PADDLE_MOVEMENT: (
    tournamentCode: string,
    playerID: string,
    start: boolean,
    left: boolean
  ) => void;
}

interface ServerToHostEvents {
  PLAYERS_UPDATE: (players: PlayerAttributes[]) => void;
}

interface ServerToPlayerEvents {

  MATCH_START : (
      players: PlayerAttributes[],
      matchType:MatchType
  )=>void;

  MATCH_DATA : (
    players : PlayerAttributes[],
    winnerUserID: string | undefined
  ) => void;

  MATCH_RPS_DUEL_STATE : (
      p1Action: Action,
      p2Action: Action
  )=> void;

  MATCH_PONG_STATE: (
    ballState: PongBallState,
    paddleStates: PongPaddleState[],
  ) => void;

  REACTION_ADDED: (reaction: ReactionData) => void;
}
