// Description: This file contains the logic to handle allocation of players
// into rooms and recursive reduction of rooms until a winner is determined.

// Contains sample logic. Needs to be refactored and integrated with the duel logic.

import io from "./server";
import Player from "./model/actors/player";

// Function to handle allocation of players and recursive reduction of rooms
export const handleRoomAllocation = async (
  // players: Player[],
  playerGroups: Player[][],
  gameCode: string,
) => {
  const winners: Player[] = [];

  let roomNumber = 0;
  // Iterate through each group of players
  for (const group of playerGroups) {
    // Generate a unique room name
    const roomName = generateUniqueRoomName(gameCode, roomNumber);
    console.log(`Allocating players to room: ${roomName}`);

    // Allocate players to their respective room
    for (const player of group) {
      // check if the player is a bot
      if (!player.isBot) {
        const socket = io.sockets.sockets.get(player.socketId);
        if (socket) {
          await socket.join(roomName); // Join the socket to the room
        }
        // do something related to the actual player winning
      } else {
      }
    }

    // Emit "CHOOSE_PLAYER_MOVE" event to each room
    io.to(roomName).emit("CHOOSE_PLAYER_MOVE");
    roomNumber++;
  }

  // Wait for results from each room
  await waitForResults(playerGroups, winners);

  // If more than one room remains, recursively handle allocation
  if (playerGroups.length > 1) {
    // communicate to host this round has concluded
    io.to(gameCode).emit("ROUND_RESULTS", winners);
  } else {
    // Implement logic to determine the winner
    console.log("Game ended");
    const winningPlayer = winners[0]; // Assuming there is only one winner
    const winningSocket = io.sockets.sockets.get(winningPlayer.socketId);
    if (winningSocket) {
      // Emit a socket message to the winning player
      winningSocket.emit("GAME_WINNER", { winner: winningPlayer });
    }
    return;
  }
};

// Generate a random alphanumeric room name
function generateUniqueRoomName(gameCode: string, roomNumber: number): string {
  return `GAME_${gameCode}&ROOM_${roomNumber.toString()}`;
}

const waitForResults = async (playerGroups: Player[][], winners: Player[]) => {
  // Simulate waiting for results
  await new Promise((resolve) => setTimeout(resolve, 11000));

  // Simulate determining winners
  console.log("Results received. Determining winners...");
  for (const group of playerGroups) {
    const winner = group[0];
    winners.push(winner);
    console.log(`Winner: ${winner.name}`);
  }
};
