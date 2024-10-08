import { Request, Response } from "express";
import { obscenityMatcher, tournamentMap } from "../../store";
import Player from "../../model/player";
import { Server } from "socket.io";

interface JoinTournamentBody {
  userID: string | undefined;
  playerName: string | undefined;
  tournamentCode: string | undefined;
}

export const joinTournamentHandler =
  (io: Server) => (req: Request, res: Response) => {
    const { userID, playerName, tournamentCode } =
      req.body as JoinTournamentBody;

    if (
      userID === undefined ||
      playerName === undefined ||
      tournamentCode === undefined
    ) {
      console.error("Invalid Join Data sent");
      res
        .status(422)
        .json({ body: { message: "An Error Occurred Try Again" } });
      return;
    }

    const tournament = tournamentMap.get(tournamentCode);

    if (tournament === undefined) {
      console.error(
        `Player : ${playerName} was unable to join Tournament : ${tournamentCode}`,
      );
      res.status(422).json({ body: { message: "Tournament Does Not Exist" } });
      return;
    }

    if (tournament.inProgress) {
      res
        .status(422)
        .json({ body: { message: "Tournament Has Already Started" } });
      return;
    }

    if (!tournament.canSocketJoin(userID)) {
      console.error(
        `Player : ${userID} has already connected to Tournament : ${tournamentCode}`,
      );
      res.status(422).json({ body: { message: "Browser Already In Use" } });
      return;
    }

    if (obscenityMatcher.hasMatch(playerName)) {
      console.error(`Player : ${userID} has an inappropriate name`);
      res.status(422).json({ body: { message: "Player Name Inappropriate" } });
      return;
    }

    if (!tournament.isPlayerNameFree(playerName)) {
      console.error(`Player : ${playerName} is already taken`);
      res.status(422).json({ body: { message: "Player Name Taken" } });
      return;
    }

    const player = new Player(userID, playerName, false);
    tournament.addPlayer(player);

    console.log(`Player : ${playerName} has joined Game : ${tournamentCode}`);

    io.to(tournament.hostUID).emit(
      "TOURNAMENT_STATE",
      tournament.players,
      tournament.inProgress,
    );
    res.sendStatus(200);
  };
