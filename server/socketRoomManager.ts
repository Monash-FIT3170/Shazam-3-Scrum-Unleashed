// Description: This file contains the logic to handle allocation of players
// into rooms and recursive reduction of rooms until a winner is determined.

import  io  from "./server";
import Player from "./model/actors/player"; 

// Function to handle allocation of players and recursive reduction of rooms
export const handleRoomAllocation = async (
  players: Player[],
) => {

  const winners: Player[] = [];

  const numPlayers = players.length;
  const numRooms = Math.ceil(numPlayers / 2); // Each room will have 2 players

  // Divide players into groups for each room
  const playerGroups: Player[][] = [];
  for (let i = 0; i < numRooms; i++) {
    const startIndex = i * 2;
    const endIndex = Math.min(startIndex + 2, numPlayers);
    const group = players.slice(startIndex, endIndex);
    playerGroups.push(group);
  }

  // Iterate through each group of players

  for (const group of playerGroups) {
    const roomName = generateUniqueRoomName();

    // Allocate players to their respective room
    for (const player of group) {
      const socket = io.sockets.sockets.get(player.socketId);
      if (socket) {
        socket.join(roomName); // Join the socket to the room
      }
    }

    // Emit "CHOOSE_PLAYER_MOVE" event to each room
    io.to(roomName).emit("CHOOSE_PLAYER_MOVE");
  }

  // Wait for results from each room
  await waitForResults(playerGroups, winners);

  // If more than one room remains, recursively handle allocation
  if (playerGroups.length > 1) {
    await handleRoomAllocation(winners);
  } else {
    // Implement logic to determine the winner
    console.log("Game ended");
    return;
  }
};

  // Generate a random alphanumeric room name
function generateUniqueRoomName(): string {
  return Math.random().toString(36).substring(2, 8);
}


const waitForResults = async (playerGroups: Player[][], winners: Player[]) => {
  // Simulate waiting for results
  await new Promise((resolve) => setTimeout(resolve, 11000));

  // Get the first player in each group as the winner
  for (const group of playerGroups) {
    const winner = group[0];
    winners.push(winner);
    console.log(`Winner: ${winner.name}`);
  }
  console.log("Results received. Determining winners...");
};
