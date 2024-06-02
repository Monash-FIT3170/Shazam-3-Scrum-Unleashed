import DisplayLogo from "../components/DisplayLogo.tsx";
import {useEffect, useState} from "react";

import {socket} from "../App.tsx";
import {useLoaderData, useNavigate} from "react-router-dom";
import {PLAYER_SCREEN} from "./pagePaths.ts";
import InputComponent from "../components/inputs/InputComponent.tsx";
import FormButton from "../components/buttons/FormButton.tsx";

type JoinState = "NoCurrentRequest" | "Waiting" | "Joining";

const JoinTournament = () => {
    const urlTournamentCode = useLoaderData() as string;
    const navigate = useNavigate();

    const [tournamentCode, setTournamentCode] = useState(urlTournamentCode);
    const [playerName, setPlayerName] = useState("");
    const [joinState, setJoinState] = useState<JoinState>("NoCurrentRequest");

    const [playerNameError, setPlayerNameError] = useState<string|null>(null)
    const [tournamentCodeError, setTournamentCodeError] = useState<string|null>(null)

    const firstError = () =>{
        return tournamentCodeError !== null ? tournamentCodeError : playerNameError !== null ? playerNameError : null;
    }

    const changeTournamentCode = (code: string) => {
        if (/\d+/.test(code) && code.length <= 6) {
            setTournamentCode(code)
            setTournamentCodeError(null)
        }
    }

    const changePlayerName = (name: string) => {
        setPlayerName(name)
        setPlayerNameError(null)
    }

    const tournamentCodeValidation = () => {
        return /^\d{6}$/.test(tournamentCode) && tournamentCodeError === null;
    }

    const playerNameValidation = () => {
        return playerName.length > 0 && playerNameError === null;
    }

    const joinTournament = () => {
        if (!tournamentCodeValidation() || !playerNameValidation()){
            if (!tournamentCodeValidation()){
                setTournamentCodeError("Enter Valid Tournament Code")
            }
            if (!playerNameValidation()){
                setPlayerNameError("Enter Valid Player Name")
            }
            return;
        }

        setJoinState("Waiting");
        socket.emit("JOIN_TOURNAMENT", tournamentCode, playerName);
    };

    socket.on("JOINED_TOURNAMENT", (joinErrorCode) => {
        switch (joinErrorCode) {
            case "SUCCESS":
                setJoinState("Joining");
                break;
            case "NAME_TAKEN":
                setJoinState("NoCurrentRequest");
                setPlayerName("Player Name Taken")
                break;
            case "INVALID_TOURNAMENT_CODE":
                setJoinState("NoCurrentRequest");
                setTournamentCodeError("Tournament Does Not Exist")
                break;
        }
    });

    useEffect(() => {
        if (joinState === "Joining") {
            navigate(
                `../${PLAYER_SCREEN}?playerName=${playerName}&tournamentCode=${tournamentCode}`,
            );
        }
    }, [joinState]);

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className=" items-center size-60 w-full">
                <DisplayLogo/>
            </div>

            <InputComponent value={tournamentCode} callback={changeTournamentCode} error={tournamentCodeError}
                            placeholder={"6 DIGIT ROOM CODE"} testid={"tournament-code-input"}/>
            <InputComponent value={playerName} callback={changePlayerName} error={playerNameError}
                            placeholder={"NAME"} testid={"player-name-input"}/>

            <FormButton text={"Join Game"} error={firstError()} loading={joinState === "Joining"} callback={joinTournament}/>

        </div>
    );
};

export default JoinTournament;
