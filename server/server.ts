import express from "express";
import cors from "cors";
import * as http from "http";
import { Server, Socket } from "socket.io";

import { Events } from "../types/socket/events";
import Game from "./model/game";
import Player from "./model/actors/player";
import Host from "./model/actors/host";
import { playerRoomName } from "./socket/roomNames";

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

const gamesMap = new Map<string, Game>();

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

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
    const player = new Player(socket.id, playerName, 0, false);

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

  socket.on("START_GAME", (gameCode) => {
    console.log(`Game Started: ${gameCode}`);
  
    const game: Game | undefined = gamesMap.get(gameCode);
    const players = game?.getPlayers();

    if (game == undefined) {
      console.log(`Game : ${gameCode} does not exist`);
      return;
    } else if (players != undefined) {
      io.to(game?.HostSocketId).emit("GAME_START", players);
    } else {
      console.log(`Game : ${gameCode} has no player list`);
    }
  });
});

server.listen(3010, () => {
  console.log("SERVER IS RUNNING");
});
