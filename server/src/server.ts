import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import { Events } from "../../types/socket/events";

import { qrCode } from "src/controllers/http";

import { sessionMiddleware } from "src/middleware/session";
import { startTournamentSocket } from "src/controllers/socket/startTournament";
import { createTournamentSocket } from "src/controllers/socket/createTournament";
import { joinTournamentSocket } from "src/controllers/socket/joinTournament";
import { chooseActionSocket } from "src/controllers/socket/chooseAction";

import { tournamentMap, sessionStorage } from "src/store";
import { Action } from "../../types/types";
import { addReactionSocket } from "./controllers/socket/addReaction";

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

  socket.on(
    "CREATE_TOURNAMENT",
    async (duelsToWin: number, duelTime: number, matchTime: number) => {
      await createTournamentSocket(
        socket,
        duelsToWin,
        duelTime,
        matchTime,
        tournamentMap,
        io,
      );
    },
  );

  socket.on("JOIN_TOURNAMENT", (gameCode: string, playerName: string) => {
    joinTournamentSocket(socket, gameCode, playerName, tournamentMap, io);
  });

  socket.on("START_TOURNAMENT", (gameCode: string) => {
    startTournamentSocket(socket, gameCode, tournamentMap, io);
  });

  socket.on(
    "CHOOSE_ACTION",
    (tournamentCode: string, playerUserID: string, action: Action) => {
      chooseActionSocket(
        playerUserID,
        action,
        tournamentMap.get(tournamentCode),
        io,
      );
    },
  );

  socket.on("ADD_REACTION", (tournamentCode, reaction, spectatorID) => {
    addReactionSocket(tournamentCode, reaction, spectatorID, io, tournamentMap);
  });
});

app.get("/qr-code/:url", qrCode);

server.listen(3010, () => {
  console.log("SERVER IS RUNNING ON PORT 3010");
});
