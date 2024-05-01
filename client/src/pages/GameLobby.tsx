import DisplayLogo from "../components/DisplayLogo";
import {useState} from "react";

import {socket} from "../App.tsx";

const JoinGame = (gameCode : string, qrCode : any) => {


    return (
        <div>
            <div>
                <DisplayLogo/>
            </div>
            <h1 className="text-white font-bold mt-6 uppercase"> Game Code : {gameCode}</h1>

        </div>
    );
};

export default JoinGame;
