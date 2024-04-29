// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";
import * as http from "http";
import {Server} from "socket.io";


import {JOIN_GAME, JoinGameData, START_GAME, StartGameData} from "./events";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
})


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on(START_GAME, (data : StartGameData) => {
      // start the game
  })

  socket.on(JOIN_GAME, (data : JoinGameData) => {
    // join the game
    console.log(`Player : ${data.playerName} is trying to join Game : ${data.gameCode}`)

  })


})


server.listen(3010, () => {
  console.log("SERVER IS RUNNING");
})