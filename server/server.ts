// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";
import * as http from "http";
import {Server} from "socket.io";

import {Events} from "../types/socket/events";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server<Events>(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("start_game", (gameCode) => {
        // start the game
    })

    socket.on("join_game", (gameCode, playerName) => {
        // join the game
        console.log(`Player : ${playerName} is trying to join Game : ${gameCode}`)

    })
})


server.listen(3010, () => {
    console.log("SERVER IS RUNNING");
})