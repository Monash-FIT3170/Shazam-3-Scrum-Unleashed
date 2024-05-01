


export function hostRoomName(gameCode : string) : string{
    return `GAME_${gameCode}_HOST`
}

export function playerRoomName(gameCode : string) : string{
    return `GAME_${gameCode}_PLAYERS`
}

export function matchRoomName(gameCode : string, matchNumber:number) : string{
    return `GAME_${gameCode}_MATCH_${matchNumber}`
}