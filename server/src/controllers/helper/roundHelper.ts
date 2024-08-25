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

  // start timeout
  tournament.roundTimeoutHandler = setTimeout(() => {
    roundTerminator(tournament, io);
  }, tournament.matchTime);
}

function roundTerminator(tournament: Tournament, io: Server<Events>) {
  // might want to lock the tournament to prevent any moves or actions being sent in, idk
  for (const match of tournament.matches) {
    if (match.getMatchWinner() === null) {
      match.clearTimeouts();
      const sortedPlayers = match.players.toSorted(
        (p1, p2) => p2.score - p1.score,
      );
      const topScore = sortedPlayers[0].score;

      const winningPlayers = sortedPlayers.filter(
        (player) => player.score === topScore,
      );

      const randomIndex = Math.floor(Math.random() * winningPlayers.length);

      const winner = winningPlayers[randomIndex];

      for (const player of match.players) {
        if (player !== winner) {
          player.isEliminated = true;
        }
      }

      io.to(match.matchRoomID).emit("MATCH_DATA", match.players, winner.userID);
    }
  }

  io.to(tournament.hostUID).emit("TOURNAMENT_STATE", tournament.players, true);

  nextRoundStart(tournament, io);
}

function nextRoundStart(tournament: Tournament, io: Server) {
  setTimeout(() => {
    if (tournament.matches.length === 1) {
      io.to(tournament.matches[0].matchRoomID)
        .to(tournament.hostUID)
        .emit(
          "TOURNAMENT_COMPLETE",
          tournament.matches[0].getMatchWinner()?.name ?? "",
        );

      setTimeout(() => {
        io.in(tournament.matches[0].matchRoomID).socketsLeave(
          tournament.matches[0].matchRoomID,
        );
        tournamentMap.delete(tournament.hostUID);
      }, LIFE_AFTER_COMPLETION);
      return;
    }
    roundCloser(tournament, io);
    io.to(tournament.hostUID).emit(
      "TOURNAMENT_STATE",
      tournament.players,
      tournament.inProgress,
    );
    void roundInitialiser(tournament, io);
  }, ROUND_BUFFER_TIME);
}

export function roundChecker(tournament: Tournament, io: Server<Events>) {
  // At least one player has been eliminated when this function is called, therefore we can update the host
  io.to(tournament.hostUID).emit(
    "TOURNAMENT_STATE",
    tournament.players,
    tournament.inProgress,
  );

  if (tournament.matches.every((e) => e.getMatchWinner() !== null)) {
    nextRoundStart(tournament, io);
  }
}

export function roundCloser(tournament: Tournament, io: Server<Events>) {
  tournament.roundTimeoutHandler = null;
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
  const matchWinners = match.players.filter((player) => !player.isEliminated);

  if (matchWinners.length != 1) {
    console.error("No Match Winner Found or Multiple Found");
    return;
  }

  const matchWinner = matchWinners[0];

  for (const player of match.players) {
    if (player.userID !== matchWinner.userID || player.isEliminated) {
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
    default:
      return new RpsMatch(players, tournament.duelsToWin);
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
