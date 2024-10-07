import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";

import { Server } from "socket.io";
import { Events } from "../../types/socket/events";

import { qrCode } from "src/controllers/http";

import { sessionMiddleware } from "src/middleware/session";
import { chooseActionSocket } from "src/controllers/socket/chooseAction";

import { tournamentMap, sessionStorage } from "src/store";
import { addReactionSocket } from "./controllers/socket/addReaction";
import { reconnectionHandler } from "./utils/reconnectionHelper";
import { createTournamentHandler } from "./controllers/http/createTournamentHandler";
import { joinTournamentHandler } from "./controllers/http/joinTournamentHandler";
import { startTournamentHandler } from "./controllers/http/startTournamentHandler";
import { pongPaddleMovementSocket } from "./controllers/socket/pongPaddleMovement";
import { spectateMatchHandler } from "./controllers/http/spectateMatchHandler";
import { stopSpectatingHandler } from "./controllers/http/stopSpectatingHandler";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server<Events>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
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
  await reconnectionHandler(socket, io, tournamentMap);

  // TODO - move listener inside pongMatch method
  socket.on("PONG_PADDLE_MOVEMENT", pongPaddleMovementSocket);
  socket.on("RPS_CHOOSE_ACTION", chooseActionSocket(io));
  socket.on("ADD_REACTION", addReactionSocket(io));
  //socket.on("QUIT_TOURNAMENT", quitTournamentSocket());
});

app.get("/qr-code/:url", qrCode);
app.post("/create-tournament", createTournamentHandler);
app.post("/join-tournament", joinTournamentHandler(io));
app.post(
  "/start-tournament",
  (req, res) => void startTournamentHandler(req, res, io),
);
app.post(
  "/spectate-match",
  (req, res) => void spectateMatchHandler(io, req, res),
);
app.post(
  "/stop-spectating",
  (req, res) => void stopSpectatingHandler(io, req, res),
);

server.listen(3010, () => {
  console.log(`Server running on http://localhost:3010`);
});
