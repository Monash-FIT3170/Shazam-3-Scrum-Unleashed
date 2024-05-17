// Description: This file contains the logic to handle allocation of players
// into rooms and recursive reduction of rooms until a winner is determined.

// Contains sample logic. Needs to be refactored and integrated with the duel logic.

import { Server } from "socket.io";
import Player from "./model/actors/player";

// Function to handle allocation of players and recursive reduction of rooms
export const handleRoomAllocation = async (
  players: Player[],
  gameCode: string,
  io: Server,
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
      const socket = io.sockets.sockets.get(player.userID);
      // FIXME this isnt going to work anymore, userID wont allow us to search through the sockets to find the correct one
      //   I didnt really like this anyway
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

  // If more than one room remains, recursively handle allocation
  if (playerGroups.length > 1) {
    await handleRoomAllocation(winners, gameCode, io);
  } else {
    // Implement logic to determine the winner
    console.log("Game ended");
    const winningPlayer = winners[0]; // Assuming there is only one winner
    const winningSocket = io.sockets.sockets.get(winningPlayer.userID);
    // FIXME this isnt going to work anymore, userID wont allow us to search through the sockets to find the correct one
    //   I didnt really like this anyway
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
