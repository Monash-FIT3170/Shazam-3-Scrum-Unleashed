import { Server } from "socket.io";
import { Action } from "../../../../types/types";
import Tournament from "../../model/tournament";
import { roundChecker } from "src/controllers/helper/roundHelper";
import { tournamentMap } from "src/store";
import { RpsMatch } from "../../model/rpsMatch";
import { Events } from "../../../../types/socket/events";

export const playDuel =
  (tournament: Tournament, io: Server<Events>) => (match: RpsMatch) => {
    match.updateScores();
    const matchWinner = match.getMatchWinner();
    const matchWinnerUserID = matchWinner?.userID;
    io.to(match.matchRoomID).emit(
      "MATCH_INFO",
      match.players,
      true,
      matchWinnerUserID ?? null,
    );

    match.resetActions();

    if (matchWinnerUserID === undefined) {
      match.startTimeout(playDuel(tournament, io), tournament.duelTime);
      return;
    }

    roundChecker(tournament, io, match);
  };

export const chooseActionSocket =
  (io: Server) =>
  (tournamentCode: string, playerUserID: string, action: Action) => {
    const tournament = tournamentMap.get(tournamentCode);

    if (!tournament) {
      console.error("No tournament found");
      return;
    }

    const match = tournament.getMatch(playerUserID);

    if (!match) {
      console.error("Match not found" + " " + playerUserID);
      return;
    }

    for (const player of match.players) {
      if (player.userID === playerUserID) {
        player.gameData = action;
      }
    }

    const rpsMatch = match as RpsMatch;
    if (rpsMatch.isDuelComplete()) {
      rpsMatch.completeDuel(io, tournament);
    }
  };
