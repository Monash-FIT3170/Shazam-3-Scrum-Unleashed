import {MatchType} from "./socket/eventArguments";
import {PlayerAttributes} from "./types";

export interface CreateTournamentRes {
    tournamentCode: string;
}

export interface JoinTournamentRes {
    message: string | "OK";
}

export interface SpectateMatchRes {
    players: PlayerAttributes[],
    matchType: MatchType,
    winnerUserID: string | undefined
}
