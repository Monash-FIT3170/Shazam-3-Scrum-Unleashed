import { Request, Response } from "express";
import { tournamentMap } from "../../store";
import { getSocket } from "../../utils/socketUtils";
import { Server } from "socket.io";

interface StopSpectatingBody {
  hostID: string | undefined;
  tournamentCode: string | undefined;
  playerUserID: string | undefined;
}

export const stopSpectatingHandler = async (
  io: Server,
  req: Request,
  res: Response,
) => {
  const { hostID, tournamentCode, playerUserID } =
    req.body as StopSpectatingBody;

  if (
    hostID === undefined ||
    tournamentCode === undefined ||
    playerUserID === undefined
  ) {
    res.sendStatus(400);
    return;
  }

  const tournament = tournamentMap.get(tournamentCode);

  if (!tournament) {
    res.sendStatus(400);
    return;
  }

  if (tournament.hostUID !== hostID) {
    res.sendStatus(400);
    return;
  }

  const match = tournament.getMatch(playerUserID);

  if (!match) {
    res.sendStatus(400);
    return;
  }

  const hostSocket = getSocket(hostID, io);

  if (!hostSocket) {
    res.sendStatus(400);
    return;
  }

  await hostSocket.leave(match.matchRoomID);
  for (const player of match.players) {
    if (player.userID === playerUserID) {
      player.spectatorIDs = player.spectatorIDs.filter((id) => id !== hostID);
    }
  }

  res.sendStatus(200);
};
