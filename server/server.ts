import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";

import { Events } from "../types/socket/events";
import Game from "./model/game";
import Player from "./model/actors/player";
import Host from "./model/actors/host";
import { playerRoomName } from "./socket/roomNames";
import QRCode from "qrcode";
import InMemorySessionStore from "./socket/sessionStore";

declare module "socket.io" {
  interface Socket {
    sessionID: string;
    userID: string;
  }
}

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server<Events>(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
export default io;

const gamesMap = new Map<string, Game>();

const sessionStorage = new InMemorySessionStore();

io.use((socket, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sessionID: string = socket.handshake.auth["sessionID"];
  if (sessionID) {
    // find existing session
    const userID = sessionStorage.findSession(sessionID);
    if (userID) {
      socket.sessionID = sessionID;
      socket.userID = userID;
      next();
      return;
    }
  }
  // create new session
  socket.sessionID = (Math.random() * 1000).toString(); // TODO actually generate
  socket.userID = (Math.random() * 1000).toString();
  next();
});

io.on("connection", async (socket) => {
  console.log(
    `User Connected: ${socket.id}, sessionID: ${socket.sessionID}, userID: ${socket.userID}`,
  );

  // Save the socket sessionID and userID
  sessionStorage.saveSession(socket.sessionID, socket.userID);

  // Get the socket to join the userID room. This will be used to send messages, rather then the socketID,
  // as it will remain constant and thus will not need to be changes
  await socket.join(socket.userID);

  // Sends SESSION_INFO to socket (lets them know their sessionID and userID)
  io.to(socket.userID).emit("SESSION_INFO", socket.sessionID, socket.userID);

  socket.on("JOIN_GAME", async (gameCode, playerName) => {
    const game: Game | undefined = gamesMap.get(gameCode);

    if (game == undefined) {
      // debugging purposes
      console.log(
        `Player : ${playerName} was unable to join Game : ${gameCode}`,
      );

      // tell the player no game with that code
      io.to(socket.id).emit("JOINED_GAME", "INVALID_GAME_CODE");
      return;
    }

    if (!game.canSocketJoin(socket.id)) {
      // debugging purposes
      console.log(
        `Player : ${socket.id} has already connected to Game : ${gameCode}`,
      );

      // Not sure if we need to send an event back
      return;
    }

    if (!game.isPlayerNameFree(playerName)) {
      // debugging purposes
      console.log(`Player : ${playerName} is already taken`);

      // tell the player name is taken
      io.to(socket.id).emit("JOINED_GAME", "NAME_TAKEN");
      return;
    }

    // Player can Join the Game

    // debugging purposes
    console.log(`Player : ${playerName} has joined Game : ${gameCode}`);

    // create the player
    // const player = new Player(socket.id, playerName, game.getPlayers.length, false);
    // was using the one above but game.getPlayers.length was returning 0 every time
    const player = new Player(
      socket.id,
      playerName,
      Math.floor(4 * Math.random()),
      false,
    );

    // add player to game
    game.addPlayer(player);

    // add socket to a PLAYER ROOM of the Game
    await socket.join(playerRoomName(gameCode));

    // send JOINED_GAME event to player, to notify them
    io.to(socket.id).emit("JOINED_GAME", "SUCCESS");

    // send PLAYER_HAS_JOINED event to host, to notify them
    io.to(game.HostSocketId).emit("PLAYER_HAS_JOINED", player);
  });

  socket.on("CREATE_GAME", (duelsPerMatch, duelTime, matchTime) => {
    console.log(`Host : ${socket.id} is creating a game`);

    // create the host and game
    const host: Host = new Host(socket.id);
    const game: Game = new Game(host, duelsPerMatch, duelTime, matchTime);

    // generated gameRoomCode (defaulted atm)
    const gameCode = "000000";
    gamesMap.set(gameCode, game);

    // Send GAME_CREATED event
    io.to(host.socketId).emit("GAME_CREATED", gameCode);
  });

  socket.on("START_GAME", async (gameCode) => {
    const game: Game | undefined = gamesMap.get(gameCode);

    // checking for existing game
    if (game == undefined) {
      console.log(`Game : ${gameCode} does not exist`);
      return;
      // checking for valid player numbers
    } else {
      console.log(game.getPlayers().length);
      if (game.getPlayers().length >= 2) {
        console.log(`Game Started: ${gameCode}`);
        game.startTournament();
        const players = game.getRemainingPlayers();
        io.to(game.HostSocketId).emit("GAME_START", players);
        await game.allocateRooms(gameCode);
      } else {
        console.log(`Game : ${gameCode} has less than 2 players`);
      }
    }
  });

  // socket.on("ALLOCATE_PLAYERS", async (gameCode) => {
  //   const game: Game | undefined = gamesMap.get(gameCode);
  //   if (!game) {
  //     return;
  //   }
  //   await game.allocateRooms(gameCode);
  // });
});

app.get("/qr-code/:url", (req, res, next) => {
  // TS fucking cancer
  void (async () => {
    const url = req.params.url;
    let qrCode;
    try {
      // Note: If QR code is difficult to scan from distance. We can increase redundancy.
      qrCode = await QRCode.toDataURL(url);
    } catch (error) {
      next(error);
      res.status(500).send("Error generatring QR Code");
      return;
    }
    res.status(200).send({
      qrCode,
    });
  })();
});

server.listen(3010, () => {
  console.log("SERVER IS RUNNING");
});

export const handleRoomAllocation = async (
  // players: Player[],
  playerGroups: Player[][],
  gameCode: string,
) => {
  const winners: Player[] = [];

  let roomNumber = 0;
  // Iterate through each group of players
  for (const group of playerGroups) {
    // Generate a unique room name
    const roomName = generateUniqueRoomName(gameCode, roomNumber);
    console.log(`Allocating players to room: ${roomName}`);

    // Allocate players to their respective room
    for (const player of group) {
      // check if the player is a bot
      if (!player.isBot) {
        const socket = io.sockets.sockets.get(player.socketId);
        if (socket) {
          await socket.join(roomName); // Join the socket to the room
        }
        // do something related to the actual player winning
      } else {
      }
    }

    // Emit "CHOOSE_PLAYER_MOVE" event to each room
    io.to(roomName).emit("CHOOSE_PLAYER_MOVE");
    roomNumber++;
  }

  // Wait for results from each room
  await waitForResults(playerGroups, winners);

  // If more than one room remains, recursively handle allocation
  if (playerGroups.length > 1) {
    // communicate to host this round has concluded
    const game: Game | undefined = gamesMap.get(gameCode);
    game?.getTournamentManager().appendWinners(winners);
    io.to(gameCode).emit("ROUND_RESULTS", winners);
    await game?.allocateRooms(gameCode);
  } else {
    // Implement logic to determine the winner
    console.log("Game ended");
    const winningPlayer = winners[0]; // Assuming there is only one winner
    const winningSocket = io.sockets.sockets.get(winningPlayer.socketId);
    if (winningSocket) {
      // Emit a socket message to the winning player
      winningSocket.emit("GAME_WINNER", { winner: winningPlayer });
    }
    return;
  }
};

// Generate a random alphanumeric room name
function generateUniqueRoomName(gameCode: string, roomNumber: number): string {
  return `GAME_${gameCode}&ROOM_${roomNumber.toString()}`;
}

const waitForResults = async (playerGroups: Player[][], winners: Player[]) => {
  // Simulate waiting for results
  await new Promise((resolve) => setTimeout(resolve, 11000));

  // Simulate determining winners
  console.log("Results received. Determining winners...");
  for (const group of playerGroups) {
    const winner = group[0];
    winners.push(winner);
    console.log(`Winner: ${winner.name}`);
  }
};
