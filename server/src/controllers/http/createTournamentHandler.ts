import { Request, Response } from "express";
import Tournament from "../../model/tournament";
import { tournamentMap } from "../../store";
import { CreateTournamentRes } from "../../../../types/requestTypes";
import { MatchType } from "../../../../types/socket/eventArguments";

interface CreateTournamentBody {
  userID: string | undefined;
  duelsToWin: number | undefined;
  duelTime: number | undefined;
  roundTime: number | undefined;
  matchType: MatchType[] | undefined;
}

export function createTournamentHandler(req: Request, res: Response) {
  const { userID, duelsToWin, duelTime, matchTime, matchType } =
    req.body as CreateTournamentBody;

  if (
    userID === undefined ||
    duelsToWin === undefined ||
    duelTime === undefined ||
    roundTime === undefined
  ) {
    console.log("Invalid Host or Game Data sent");
    res.sendStatus(422);
    return;
  }

  console.log(`Host ${userID} is creating a game`);

  const tournament: Tournament = new Tournament(
    userID,
    Number(duelsToWin),
    Number(duelTime) * 1000,
    Number(roundTime) * 1000,
    Number(matchTime) * 1000,
    matchType,
  );

  let tournamentCode;
  do {
    tournamentCode = Math.random().toString().substring(2, 8);
  } while (tournamentMap.has(tournamentCode));

  tournamentMap.set(tournamentCode, tournament);
  res.status(200).json({ body: { tournamentCode } as CreateTournamentRes });
}
