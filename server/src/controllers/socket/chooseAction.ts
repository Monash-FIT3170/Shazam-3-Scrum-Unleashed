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
      "MATCH_RPS_DUEL_STATE",
      match.p1Action,
      match.p2Action,
    );
    match.resetActions();

    io.to(match.matchRoomID).emit(
      "MATCH_DATA",
      match.players,
      matchWinnerUserID,
    );

    if (matchWinnerUserID === undefined) {
      match.startTimeout(playDuel(tournament, io), tournament.duelTime + 4000);
      return;
    }

    roundChecker(tournament, io);
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

    // TODO pass in the choice which gives a random powerup
    // placing it here only shows the powerup location only after one of the players has choosen a move
    // const totalScored = rpsMatch.players[0].score + rpsMatch.players[1].score;
    // if (totalScored === Math.ceil(rpsMatch.duelsToWin / 2)) {
    //   rpsMatch.spawnPowerup(io);
    //   console.log("powerup spawned");
    // }

    if (rpsMatch.players[0].userID === playerUserID) {
      rpsMatch.p1Action = action;
    } else {
      rpsMatch.p2Action = action;
    }

    if (rpsMatch.isDuelComplete()) {
      rpsMatch.completeDuel(io, tournament);
    }
  };
