import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// TODO: Get socket ID for the room
const socket = io('http://localhost:3001');

export const Timer = () => {
    const [duelTime, setDuelTime] = useState(30);

    useEffect(() => {
        // Starting round countdown
        socket.on('startDuelTimer', (time: number) => {
            setDuelTime(time);
        });

        // Ending the round countdown
        socket.on('stopDuelTimer', () => {
            console.log("Duel Ended")
            setDuelTime(0);
        });
        
        // Cleaning up event listeners
        return () => {
            socket.off('startDuelTimer');
            socket.off('stopDuelTimer');
        };
    }, []);

    return (
        <div>
            <h1>Duel Time: {duelTime}</h1>
        </div>
    )
}