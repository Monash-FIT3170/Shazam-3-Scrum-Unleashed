import Tournament from "src/model/tournament";
import InMemorySessionStore from "./sessionStore";

export const tournamentMap = new Map<string, Tournament>();
export const sessionStorage = new InMemorySessionStore();
