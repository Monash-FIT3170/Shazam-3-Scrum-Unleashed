// Description: This file contains the logic to handle allocation of players
// into rooms and recursive reduction of rooms until a winner is determined.

// Contains sample logic. Needs to be refactored and integrated with the duel logic.

import io from "./server";
import Player from "./model/actors/player";
import { Action } from "../types/types";
import { GameSessionManager } from "model/gameSessionManager";

// Function to handle allocation of players and recursive reduction of rooms
export const handleRoomAllocation = async (
  players: Player[],
  gameCode: string,
) => {
  const winners: Player[] = [];

  const numPlayers = players.length;
  const numRooms = Math.ceil(numPlayers / 2); // Each room will have 2 players

  // Divide players into groups for each room
  // tournamentManager should be responsible for this logic
  const playerGroups: Player[][] = [];
  for (let i = 0; i < numRooms; i++) {
    const startIndex = i * 2;
    const endIndex = Math.min(startIndex + 2, numPlayers);
    const group = players.slice(startIndex, endIndex);
    playerGroups.push(group);
  }

  let roomNumber = 0;
  // Iterate through each group of players
  for (const group of playerGroups) {
    // Generate a unique room name
    const roomName = generateUniqueRoomName(gameCode, roomNumber);
    console.log(`Allocating players to room: ${roomName}`);

    // Allocate players to their respective room
    for (const player of group) {
      const socket = io.sockets.sockets.get(player.socketId);
      if (socket) {
        await socket.join(roomName); // Join the socket to the room
      }
    }

    // Emit "CHOOSE_PLAYER_MOVE" event to each room
    io.to(roomName).emit("CHOOSE_PLAYER_MOVE");
    roomNumber++;
  }

  // Wait for results from each room
  await waitForResults(playerGroups, winners);
  // Correctly return winners here:

  winners.forEach((winner) => {
    const winnerSocket = io.sockets.sockets.get(winner.socketId);
    if (winnerSocket) {
      winnerSocket.emit("RE_RENDER_MOVE_COMPONENT");
    }
  });

  // If more than one room remains, recursively handle allocation
  if (winners.length > 1) {
    await handleRoomAllocation(winners, gameCode);
  } else {
    // Implement logic to determine the winner
    console.log("Game ended");
    const winningPlayer = winners[0]; // Assuming there is only one winner
    const winningSocket = io.sockets.sockets.get(winningPlayer.socketId);
    if (winningSocket) {
      // Emit a socket message to the winning player
      winningSocket.emit("GAME_WINNER", { winner: winningPlayer });
    }
  }
};

// Generate a random alphanumeric room name
function generateUniqueRoomName(gameCode: string, roomNumber: number): string {
  return `GAME_${gameCode}&ROOM_${roomNumber.toString()}`;
}

const waitForResults = async (playerGroups: Player[][], winners: Player[]) => {
  return new Promise<void>((resolve) => {
    const drawGroups: Player[][] = [];
    let processedGroups = 0;

    playerGroups.forEach((group) => {
      if (group.length === 2) {
        const player1 = group[0];
        const player2 = group[1];
        const sessionManager = new GameSessionManager(player1, player2);

        const playerMoves: Record<string, Action> = {};
        let moveCount = 0;

        group.forEach((player) => {
          const socket = io.sockets.sockets.get(player.socketId);

          socket?.once("CHOOSE_ACTION", (move: Action) => {
            playerMoves[player.socketId] = move;
            moveCount++;

            // Check if both players in the group have made their moves
            if (moveCount === group.length) {
              const player1Move = playerMoves[player1.socketId];
              const player2Move = playerMoves[player2.socketId];

              const winner = sessionManager.playRound(player1Move, player2Move);

              if (winner == "DRAW") {
                drawGroups.push(group);
              } else {
                winners.push(winner);
              }

              processedGroups++;

              // If all groups have reported their results, resolve the promise
              if (processedGroups === playerGroups.length) {
                io.emit("PLAYER_MOVES_MADE");
                if (drawGroups.length > 0) {
                  handleDraw(drawGroups, winners)
                    .then(() => {
                      resolve();
                    })
                    .catch((err: unknown) => {
                      console.error("Error handling draw groups:", err);
                      resolve();
                    });
                } else {
                  resolve();
                }
              }
            }
          });
        });
      } else {
        // If there's only one player in the group, they automatically win
        const winner = group[0];
        winners.push(winner);

        processedGroups++;
        // If all groups have reported their results, resolve the promise
        if (processedGroups === playerGroups.length) {
          resolve();
        }
      }
    });
  });
};

async function handleDraw(
  drawGroups: Player[][],
  winners: Player[],
): Promise<void> {
  drawGroups.forEach((group) => {
    group.forEach((player) => {
      const socket = io.sockets.sockets.get(player.socketId);
      if (socket) {
        console.log(`Emitting DRAW to player: ${player.socketId}`);
        socket.emit("DRAW");
      }
    });
  });

  await waitForResults(drawGroups, winners);
}
