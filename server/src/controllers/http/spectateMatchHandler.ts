import { Request, Response } from "express";
import { tournamentMap } from "../../store";
import { getSocket } from "../../utils/socketUtils";
import { Server } from "socket.io";
import { SpectateMatchRes } from "../../../../types/requestTypes";

interface SpectateMatchBody {
  hostID: string | undefined;
  tournamentCode: string | undefined;
  playerUserID: string | undefined;
}

export const spectateMatchHandler = async (
  io: Server,
  req: Request,
  res: Response,
) => {
  const { hostID, tournamentCode, playerUserID } =
    req.body as SpectateMatchBody;

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

  await hostSocket.join(match.matchRoomID);

  for (const player of match.players) {
    if (player.userID === playerUserID) {
      player.spectatorIDs.push(hostID);
    }
  }

  const matchData = {
    players: match.players,
    matchType: match.type(),
    winnerUserID: match.getMatchWinner()?.name,
  } as SpectateMatchRes;

  res.status(200).json({ body: matchData });
};
