import {JoinError} from "./socket/eventArguments";

export interface CreateTournamentRes {
    tournamentCode:string;
}

export interface JoinTournamentRes {
    message:JoinError|"OK";
}