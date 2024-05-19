import { Server } from "socket.io";
import { ReactionData } from "../../../../types/types";
import Tournament from "src/model/tournament";

export function addReactionSocket(
  tournamentCode: string,
  reaction: ReactionData,
  spectatorID: string,
  io: Server,
  tournamentMap: Map<string, Tournament>
) {
  const match = tournamentMap.get(tournamentCode)?.getMatch(spectatorID);
  if (!match) {
    return;
  }

  io.to(match.matchRoomID).emit("REACTION_ADDED", reaction);
}
