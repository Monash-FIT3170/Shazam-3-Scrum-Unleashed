import express from "express";
import cors from "cors";
import * as http from "http";
import {Server} from "socket.io";

import {Events} from "../types/socket/events";
import Game from "./model/game";
import {hostRoomName, playerRoomName} from "./socket/roomNames";
import Player from "./model/actors/player";
import Host from "./model/actors/host";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server<Events>(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

const gamesMap: Map<string, Game> = new Map<string, Game>();

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("CREATE_GAME", (hostName) => {

        // debugging purposes
        console.log(`Player : ${hostName} is creating a game`)

        // create the host and game
        const host: Host = new Host(socket.id, hostName);
        const game: Game = new Game(host);

        // generated gameRoomCode (defaulted atm)
        const gameCode: string = "000000"
        gamesMap.set(gameCode, game);

        // add socket to a HOST ROOM for the Game (could just use the host socket.id)
        socket.join(hostRoomName(gameCode));

        // send GAME_CREATED event to host, to notify them
        io.to(game.HostSocketID).emit("GAME_CREATED", gameCode, {/*TODO QR CODE*/})

    })

    socket.on("JOIN_GAME", (gameCode, playerName) => {

        if (gamesMap.has(gameCode)) {
            // debugging purposes
            console.log(`Player : ${playerName} has joined Game : ${gameCode}`)

            // create the player
            const player = new Player(playerName, 0, false);

            // add socket to a PLAYER ROOM for the Game
            socket.join(playerRoomName(gameCode));

            // send JOINED_GAME event to player, to notify them
            io.to(socket.id).emit("JOINED_GAME", player);

            // send PLAYER_HAS_JOINED event to host, to notify them
            io.to(hostRoomName(gameCode)).emit("PLAYER_HAS_JOINED", player)
        } else {
            // debugging purposes
            console.log(`Player : ${playerName} was unable to join Game : ${gameCode}`)

            // tell the player no game with that code
            io.to(socket.id).emit("INVALID_GAME_CODE");
        }


    })
})


server.listen(3010, () => {
    console.log("SERVER IS RUNNING");
})