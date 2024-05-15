// gameManager.ts
import  io  from "./server";
import Game from "./model/game"; 
import Player from "./model/actors/player"; 

// Function to handle allocation of players and recursive reduction of rooms
export const handleRoomAllocation = async (
  gameCode: string,
  gamesMap: Map<string, Game>
) => {
  const game: Game | undefined = gamesMap.get(gameCode);
  if (!game) {
    return;
  }

  // tournamentManager.ts needs to handle this logic 

  const numPlayers = game.getPlayers().length;
  const numRooms = Math.ceil(numPlayers / 2); // Each room will have 2 players

  // Divide players into groups for each room
  const playerGroups: Player[][] = [];
  for (let i = 0; i < numRooms; i++) {
    const startIndex = i * 2;
    const endIndex = Math.min(startIndex + 2, numPlayers);
    const group = game.getPlayers().slice(startIndex, endIndex);
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
  await waitForResults(playerGroups); // Pass the socket.io instance to the function

  // If more than one room remains, recursively handle allocation
  if (playerGroups.length > 1) {
    await handleRoomAllocation(gameCode, gamesMap);
  } else {
    // Game ends when only one room remains
    console.log("Game ended. Final winner:", playerGroups[0][0].name);
  }
};

  // Generate a random alphanumeric room name
function generateUniqueRoomName(): string {
  return Math.random().toString(36).substring(2, 8);
}

const waitForResults = async (playerGroups: Player[][]) => {
  // Sample code to wait for results
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulating wait for results
  console.log("Results received. Determining winners...");
};
