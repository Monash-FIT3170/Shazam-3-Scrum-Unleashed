import { Request, Response } from "express";
import { obscenityMatcher, tournamentMap } from "../../store";
import Player from "../../model/player";
import { Server } from "socket.io";

interface JoinTournamentBody {
  userID: string;
  playerName: string;
  tournamentCode: string;
}

export const joinTournamentHandler =
  (io: Server) => (req: Request, res: Response) => {
    const { userID, playerName, tournamentCode } =
      req.body as JoinTournamentBody;
    const tournament = tournamentMap.get(tournamentCode);

    if (tournament == undefined) {
      console.error(
        `Player : ${playerName} was unable to join Tournament : ${tournamentCode}`,
      );
      res.status(422).json({ body: { message: "Tournament Does Not Exist" } });
      return;
    }

    if (!tournament.canSocketJoin(userID)) {
      console.error(
        `Player : ${userID} has already connected to Tournament : ${tournamentCode}`,
      );
      res.status(422).json({ body: { message: "Socket Already Connected" } });
      return;
    }

    if (obscenityMatcher.hasMatch(playerName)) {
      console.error(`Player : ${userID} has an inappropriate name`);
      res.status(422).json({ body: { message: "Player Name Inappropriate" } });
      return;
    }

    if (!tournament.isPlayerNameFree(playerName)) {
      console.log(`Player : ${playerName} is already taken`);
      res.status(422).json({ body: { message: "Player Name Taken" } });
      return;
    }

    const player = new Player(userID, playerName, false);
    tournament.addPlayer(player);

    console.log(`Player : ${playerName} has joined Game : ${tournamentCode}`);

    io.to(tournament.hostUID).emit("PLAYERS_UPDATE", tournament.players);
    res.sendStatus(200);
  };
