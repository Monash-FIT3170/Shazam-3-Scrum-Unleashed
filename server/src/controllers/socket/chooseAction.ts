import { Server } from "socket.io";
import { Action } from "../../../../types/types";
import Tournament from "../../model/tournament";
import {
  roundInitialisor,
  roundTerminator,
} from "src/controllers/helper/roundHelper";
import { tournamentMap } from "src/store";

export function chooseActionSocket(
  playerUserID: string,
  action: Action,
  tournament: Tournament | undefined,
  io: Server
) {
  if (!tournament) {
    throw Error("No tournament found");
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
    match.playDuel();

    const matchWinner = match.getMatchWinner();
    const matchWinnerUserID = matchWinner?.userID;
    io.to(match.matchRoomID).emit(
      "MATCH_INFO",
      match.players,
      matchWinnerUserID
    );

    match.resetActions();

    if (matchWinnerUserID !== undefined) {
      if (tournament.matches.every((e) => e.getMatchWinner() !== null)) {
        setTimeout(() => {
          if (tournament.matches.length === 1) {
            io.to(match.matchRoomID).emit(
              "TOURNAMENT_COMPLETE",
              matchWinner?.name
            );
            roundTerminator(tournament, io);
            tournamentMap.delete(tournament.hostUID);
            return;
          }
          roundTerminator(tournament, io);
          roundInitialisor(tournament, io);
        }, 5000);
      }
    }
  }
}
