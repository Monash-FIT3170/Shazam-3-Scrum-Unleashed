import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import { Events } from "../types/socket/events";
import Tournament from "./model/game";
import InMemorySessionStore from "./socket/sessionStore";

import { qrCode } from "controllers/http";
import {
  allocatePlayersSocket,
  createTournamentSocket,
  joinGameSocket,
} from "controllers/socket";
import { sessionMiddleware } from "middleware";

const gamesMap = new Map<string, Tournament>();
const sessionStorage = new InMemorySessionStore();
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
io.use((socket, next) => {
  sessionMiddleware(sessionStorage, socket, next);
});

io.on("connection", async (socket) => {
  console.log(
    `User Connected: ${socket.userID} with SessionID: ${socket.sessionID} on Socket: ${socket.id}`,
  );

  sessionStorage.saveSession(socket.sessionID, socket.userID);
  await socket.join(socket.userID);
  io.to(socket.userID).emit("SESSION_INFO", socket.sessionID, socket.userID);

  socket.on("JOIN_GAME", (gameCode, playerName) =>
    joinGameSocket(gameCode, playerName, gamesMap, socket, io),
  );

  socket.on("CREATE_TOURNAMENT", async (duelsPerMatch, duelTime, matchTime) => {
    await createTournamentSocket(
      socket,
      duelsPerMatch,
      duelTime,
      matchTime,
      gamesMap,
      io,
    );
  });

  socket.on("ALLOCATE_PLAYERS", (gameCode) =>
    allocatePlayersSocket(gameCode, gamesMap, io),
  );
});

app.get("/qr-code/:url", qrCode);

server.listen(3010, () => {
  console.log("SERVER IS RUNNING ON PORT 3010");
});
