import { Request, Response } from "express";
import { tournamentMap } from "../../store";
import { roundInitialiser } from "../helper/roundHelper";
import { Server } from "socket.io";

interface StartTournamentHandlerBody {
  userID: string;
  tournamentCode: string;
}

export async function startTournamentHandler(
  req: Request,
  res: Response,
  io: Server,
) {
  const { userID, tournamentCode } = req.body as StartTournamentHandlerBody;
  const tournament = tournamentMap.get(tournamentCode);

  if (tournament?.hostUID !== userID) {
    res.sendStatus(403);
    return;
  }

  await roundInitialiser(tournament, io);
  res.sendStatus(200);
}
