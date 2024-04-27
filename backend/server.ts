import express = require("express");
const app = express();
import http = require("http");
import {Server} from "socket.io";
import cors = require("cors");
import {START_GAME, StartGameData} from "./events";

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on(START_GAME, (data : StartGameData) => {
      // start the game
  })



})


server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
})