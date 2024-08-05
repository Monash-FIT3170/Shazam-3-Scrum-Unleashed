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
import { PongMatch } from "./model/pongMatch";
import Player from "./model/player";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server<Events>(server, {
  cors: {
    origin: "*",
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
  await reconnectionHandler(socket, io, tournamentMap);

  const player = new Player(socket.userID, "Test", false);
  const match = new PongMatch([player], 3);
  await socket.join(match.matchRoomID);
  match.emitGameData(io);

  socket.on("PONG_PADDLE_MOVEMENT", (start: boolean, left: boolean) => {
    if (start) {
      if (left) {
        match.paddleStates[0].direction = -1;
      } else {
        match.paddleStates[0].direction = 1;
      }
    } else {
      if (left && match.paddleStates[0].direction == -1) {
        match.paddleStates[0].direction = 0;
      } else if (!left && match.paddleStates[0].direction == 1) {
        match.paddleStates[0].direction = 0;
      }
    }
  });

  socket.on("CHOOSE_ACTION", chooseActionSocket(io));
  socket.on("ADD_REACTION", addReactionSocket(io));
});

app.get("/qr-code/:url", qrCode);
app.post("/create-tournament", createTournamentHandler);
app.post("/join-tournament", joinTournamentHandler(io));
app.post(
  "/start-tournament",
  (req, res) => void startTournamentHandler(req, res, io),
);

server.listen(3010, () => {
  console.log(`Server running on http://localhost:3010`);
});
