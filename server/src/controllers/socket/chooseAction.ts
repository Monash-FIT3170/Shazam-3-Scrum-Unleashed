import { Server } from "socket.io";
import { Action } from "../../../../types/types";
import Tournament from "../../model/tournament";
import {
  roundInitialisor,
  roundTerminator,
} from "src/controllers/helper/roundHelper";
import { tournamentMap } from "src/store";
import { Match } from "../../model/match";

export const duelStuff =
  (tournament: Tournament, io: Server) => (match: Match) => {
    match.playDuel();

    const matchWinner = match.getMatchWinner();
    const matchWinnerUserID = matchWinner?.userID;
    io.to(match.matchRoomID).emit(
      "MATCH_INFO",
      match.players,
      matchWinnerUserID,
    );

    match.resetActions();

    if (matchWinnerUserID !== undefined) {
      if (tournament.matches.every((e) => e.getMatchWinner() !== null)) {
        setTimeout(() => {
          if (tournament.matches.length === 1) {
            io.to(match.matchRoomID)
              .to(tournament.hostUID)
              .emit("TOURNAMENT_COMPLETE", matchWinner?.name);

            roundTerminator(tournament, io);
            tournamentMap.delete(tournament.hostUID);
            return;
          }
          roundTerminator(tournament, io);
          io.to(tournament.hostUID).emit("PLAYERS_UPDATE", tournament.players);
          void roundInitialisor(tournament, io);
          for (const match of tournament.matches) {
            match.startTimeout(duelStuff(tournament, io));
          }
        }, 8000);
      }
    } else {
      match.startTimeout(duelStuff(tournament, io));
    }
  };

export function chooseActionSocket(
  playerUserID: string,
  action: Action,
  tournament: Tournament | undefined,
  io: Server,
) {
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
    duelStuff(tournament, io)(match);
  }
}
