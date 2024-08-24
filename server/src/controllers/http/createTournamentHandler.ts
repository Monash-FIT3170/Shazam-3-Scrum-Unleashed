import { Request, Response } from "express";
import Tournament from "../../model/tournament";
import { tournamentMap } from "../../store";
import { CreateTournamentRes } from "../../../../types/requestTypes";

interface CreateTournamentBody {
  userID: string;
  duelsToWin: number;
  duelTime: number;
  matchTime: number;
}

export function createTournamentHandler(req: Request, res: Response) {
  const { userID, duelsToWin, duelTime, matchTime } =
    req.body as CreateTournamentBody;
  console.log(`Host ${userID} is creating a game`);

  // if (isNaN(Number(duelsToWin)) || isNaN(Number(duelTime)) || isNaN(Number(matchTime))){
  //     console.log("gsgdfsgdg")
  //     res.sendStatus(422);
  //     return;
  // }

  const tournament: Tournament = new Tournament(
    userID,
    Number(duelsToWin),
    Number(duelTime) * 1000,
    Number(matchTime) * 1000,
    // ["RPS", "PONG"] // TODO make it so the client can send data, which decides this
    ["RPS"],
  );

  let tournamentCode;
  do {
    tournamentCode = Math.random().toString().substring(2, 8);
  } while (tournamentMap.has(tournamentCode));

  tournamentMap.set(tournamentCode, tournament);
  res.status(200).json({ body: { tournamentCode } as CreateTournamentRes });
}
