import { roundStartEmitter } from "src/emitters/roundStartEmitter";
import Player from "src/model/player";
import Tournament from "src/model/tournament";
import { Server } from "socket.io";
import { Events } from "../../../../types/socket/events";
import { Match } from "src/model/matches/match";
import { PongMatch } from "../../model/matches/pongMatch";
import { tournamentMap } from "../../store";
import { RpsMatch } from "../../model/matches/rpsMatch";

const LIFE_AFTER_COMPLETION = 60000;
const ROUND_BUFFER_TIME = 8000;

export async function roundInitialiser(
  tournament: Tournament,
  io: Server<Events>,
) {
  const { matches, bots } = roundAllocator(tournament);

  tournament.players = [...tournament.players, ...bots];
  tournament.matches = matches;
  await roundStartEmitter(tournament, io);
}

export function roundChecker(
  tournament: Tournament,
  io: Server<Events>,
  match: Match,
) {
  // At least one player has been eliminated when this function is called, therefore we can update the host
  io.to(tournament.hostUID).emit("TOURNAMENT_STATE", tournament.players, true);

  if (tournament.matches.every((e) => e.getMatchWinner() !== null)) {
    setTimeout(() => {
      if (tournament.matches.length === 1) {
        io.to(match.matchRoomID)
          .to(tournament.hostUID)
          .emit("TOURNAMENT_COMPLETE", match.getMatchWinner()?.name ?? "");

        setTimeout(() => {
          io.in(match.matchRoomID).socketsLeave(match.matchRoomID);
          tournamentMap.delete(tournament.hostUID);
        }, LIFE_AFTER_COMPLETION);
        return;
      }
      roundTerminator(tournament, io);
      io.to(tournament.hostUID).emit(
        "TOURNAMENT_STATE",
        tournament.players,
        true,
      );
      void roundInitialiser(tournament, io);
    }, ROUND_BUFFER_TIME);
  }
}

export function roundTerminator(tournament: Tournament, io: Server<Events>) {
  tournament.roundCounter++;
  for (const match of tournament.matches) {
    handleSpectators(match);
    io.in(match.matchRoomID).socketsLeave(match.matchRoomID);

    for (const player of match.players) {
      player.score = 0;
    }
  }
}

function handleSpectators(match: Match) {
  const matchWinner = match.getMatchWinner();
  if (matchWinner === null) {
    console.error("No match winner found.");
    return;
  }

  for (const player of match.players) {
    if (player.userID !== matchWinner.userID) {
      matchWinner.spectatorIDs.push(player.userID);
      matchWinner.spectatorIDs = matchWinner.spectatorIDs.concat(
        player.spectatorIDs,
      );
      player.isEliminated = true;
    }
  }
}

function createMatch(players: Player[], tournament: Tournament) {
  const nextMatchType =
    tournament.matchTypeOrder[
      tournament.roundCounter % tournament.matchTypeOrder.length
    ];
  switch (nextMatchType) {
    case "RPS":
      return new RpsMatch(players, tournament.duelsToWin);
    case "PONG":
      return new PongMatch(players, tournament.duelsToWin, tournament);
  }
}

function roundAllocator(tournament: Tournament): {
  matches: Match[];
  bots: Player[];
} {
  const winningPlayers = tournament.players.filter(
    (player) => !player.isEliminated,
  );

  const bots = createBots(winningPlayers);
  const matches = [];
  for (let i = 0; i < winningPlayers.length; i++) {
    if (i < bots.length) {
      matches.push(createMatch([winningPlayers[i], bots[i]], tournament));
    } else {
      matches.push(
        createMatch([winningPlayers[i], winningPlayers[i + 1]], tournament),
      );
      i++;
    }
  }
  return { matches, bots };
}

function createBots(players: Player[]) {
  const bots = [];
  const nextPowerOf2: number = Math.pow(
    2,
    Math.ceil(Math.log(players.length) / Math.log(2)),
  );
  const numBots: number = nextPowerOf2 - players.length;

  for (let i = 0; i < numBots; i++) {
    const bot = new Player(i.toString(), `🤖 Bot #${String(i + 1)}`, true);
    bots.push(bot);
  }
  return bots;
}
