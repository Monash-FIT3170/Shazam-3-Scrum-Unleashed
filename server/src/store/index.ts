import Tournament from "src/model/tournament";
import InMemorySessionStore from "./sessionStore";
import {
    RegExpMatcher,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';


export const tournamentMap = new Map<string, Tournament>();
export const sessionStorage = new InMemorySessionStore();
export const obscenityMatcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});