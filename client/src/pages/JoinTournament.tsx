import DisplayLogo from "../components/DisplayLogo.tsx";
import { useEffect, useState } from "react";

import { socket } from "../App.tsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import { PLAYER_SCREEN } from "./pagePaths.ts";
import InputComponent from "../components/inputs/InputComponent.tsx";
import FormButton from "../components/buttons/FormButton.tsx";
import { JoinTournamentRes } from "../../../types/requestTypes.ts";
import { JoinError } from "../../../types/socket/eventArguments.ts";

async function postJoinTournament(
  userID: string,
  tournamentCode: string,
  playerName: string,
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/join-tournament`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userID, playerName, tournamentCode }),
    },
  );
  if (res.ok) {
    return "OK";
  }
  return ((await res.json()).body as JoinTournamentRes).message;
}

const JoinTournament = () => {
  const urlTournamentCode = useLoaderData() as string;
  const navigate = useNavigate();

  const [tournamentCode, setTournamentCode] = useState(urlTournamentCode);
  const [playerName, setPlayerName] = useState("");
  const [status, setStatus] = useState<JoinError | "OK">();
  const [loading, setLoading] = useState(false);

  const changeTournamentCode = (code: string) => {
    if (/^\d*$/.test(code) && code.length <= 6) {
      setTournamentCode(code);
    }
  };

  const changePlayerName = (name: string) => {
    setPlayerName(name);
  };

  const tournamentCodeValidation = () => {
    return /^\d{6}$/.test(tournamentCode);
  };

  const playerNameValidation = () => {
    return playerName.length > 0;
  };

  const joinTournament = async () => {
    if (!tournamentCodeValidation()) {
      setStatus("Enter Valid Tournament Code");
      return;
    }

    if (!playerNameValidation()) {
      setStatus("Enter Valid Player Name");
      return;
    }

    setLoading(true);
    const status = await postJoinTournament(
      socket.userID,
      tournamentCode,
      playerName,
    );

    setStatus(status);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "OK") {
      navigate(
        `../${PLAYER_SCREEN}?playerName=${playerName}&tournamentCode=${tournamentCode}`,
      );
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className=" items-center size-60 w-full">
        <DisplayLogo />
      </div>

      <InputComponent
        value={tournamentCode}
        callback={changeTournamentCode}
        placeholder={"6 DIGIT ROOM CODE"}
        disabled={loading}
        data-testid={"tournament-code-input"}
      />
      <InputComponent
        value={playerName}
        callback={changePlayerName}
        placeholder={"NAME"}
        disabled={loading}
        data-testid={"player-name-input"}
      />

      <FormButton
        text={"Join Game"}
        status={status ?? "OK"}
        loading={loading}
        callback={joinTournament}
      />
    </div>
  );
};

export default JoinTournament;
