import { tournamentMap } from "../../store";

export const quitTournamentSocket =
  () => (tournamentCode: string, userID: string) => {
    const tournament = tournamentMap.get(tournamentCode);
    if (tournament?.hostUID === userID) {
      if (tournamentMap.has(tournamentCode)) {
        tournamentMap.delete(tournamentCode); // Remove the tournament from the map
        console.log(`Tournament ${tournamentCode} has been removed.`);
      }
    }
    // May emit event in future to notify users that the tournament has been deleted
  };
