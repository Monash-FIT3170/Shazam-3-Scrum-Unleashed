import { Server } from "socket.io";
import { ReactionData } from "../../../../types/types";
import { Events } from "../../../../types/socket/events";
import { tournamentMap } from "../../store";

export const addReactionSocket =
  (io: Server<Events>) =>
  (tournamentCode: string, reaction: ReactionData, spectatorID: string) => {
    const match = tournamentMap.get(tournamentCode)?.getMatch(spectatorID);
    if (!match) {
      return;
    }
    io.to(match.matchRoomID).emit("REACTION_ADDED", reaction);
  };
