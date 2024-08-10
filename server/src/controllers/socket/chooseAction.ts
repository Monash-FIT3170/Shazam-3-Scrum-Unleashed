import { Server } from "socket.io";
import { Action } from "../../../../types/types";
import Tournament from "../../model/tournament";
import { roundChecker } from "src/controllers/helper/roundHelper";
import { tournamentMap } from "src/store";
import { RpsMatch } from "../../model/matches/rpsMatch";
import { Events } from "../../../../types/socket/events";

export const playDuel =
  (tournament: Tournament, io: Server<Events>) => (match: RpsMatch) => {
    match.updateScores();
    const matchWinner = match.getMatchWinner();
    const matchWinnerUserID = matchWinner?.userID;
    io.to(match.matchRoomID).emit(
      "MATCH_SCORE_UPDATE",
      match.players,
    );

    match.resetActions();

    if (matchWinnerUserID === undefined) {
      match.startTimeout(playDuel(tournament, io), tournament.duelTime);
      return;
    }

      setTimeout(()=>{      io.to(match.matchRoomID).emit("MATCH_WINNER",
          matchWinnerUserID
      )}, 3000) // may not want

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
      console.error("Match not found " + playerUserID);
      return;
    }

    const rpsMatch = match as RpsMatch;

    if (rpsMatch.players[0].userID === playerUserID){
        rpsMatch.p1Action = action;
    } else {
        rpsMatch.p2Action = action;
    }

    if (rpsMatch.isDuelComplete()) {
      rpsMatch.completeDuel(io, tournament);
    }
  };
