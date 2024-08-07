import { Server } from "socket.io";
import { Action } from "../../../../types/types";
import Tournament from "../../model/tournament";
import {
  roundInitialiser,
  roundTerminator,
} from "src/controllers/helper/roundHelper";
import { tournamentMap } from "src/store";
import { Match } from "../../model/match";
import { Events } from "../../../../types/socket/events";

const LIFE_AFTER_COMPLETION = 60000;
const ROUND_BUFFER_TIME = 8000;

export const playDuel =
  (tournament: Tournament, io: Server<Events>) => (match: Match) => {
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

    if (tournament.matches.every((e) => e.getMatchWinner() !== null)) {
      setTimeout(() => {
        if (tournament.matches.length === 1) {
          io.to(match.matchRoomID)
            .to(tournament.hostUID)
            .emit("TOURNAMENT_COMPLETE", matchWinner?.name ?? "");

          setTimeout(() => {
            io.in(match.matchRoomID).socketsLeave(match.matchRoomID);
            tournamentMap.delete(tournament.hostUID);
          }, LIFE_AFTER_COMPLETION);
          return;
        }
        roundTerminator(tournament, io);
        io.to(tournament.hostUID).emit("PLAYERS_UPDATE", tournament.players);
        void roundInitialiser(tournament, io);
      }, ROUND_BUFFER_TIME);
    }
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
        player.actionChoice = action;
      }
    }

    if (match.isDuelComplete()) {
      if (match.timeOutHandler) {
        clearTimeout(match.timeOutHandler);
      }
      playDuel(tournament, io)(match);
    }
  };
