import { Server } from "socket.io";
import { Action } from "../../../../types/types";
import Tournament from "../../model/tournament";
import {
  roundInitialisor,
  roundTerminator,
} from "src/controllers/helper/roundHelper";

export function chooseActionSocket(
  playerUserID: string,
  action: Action,
  tournament: Tournament | undefined,
  io: Server,
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

    const matchWinnerUserID = match.getMatchWinner()?.userID;
    io.to(match.matchRoomID).emit(
      "MATCH_INFO",
      match.players,
      matchWinnerUserID,
    );

    if (matchWinnerUserID !== undefined) {
      if (tournament.matches.every((e) => e.getMatchWinner() !== null)) {
        setTimeout(() => {
          roundTerminator(tournament, io);
          roundInitialisor(tournament, io);
        }, 5000);
      }
    }
  }
}
