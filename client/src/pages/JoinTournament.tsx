import DisplayLogo from "../components/DisplayLogo.tsx";
import { useEffect, useState } from "react";

import { socket } from "../App.tsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import { PLAYER_SCREEN } from "./pagePaths.ts";
import InputComponent from "../components/inputs/InputComponent.tsx";
import FormButton from "../components/buttons/FormButton.tsx";
import { JoinTournamentRes } from "../../../types/requestTypes.ts";
import ButtonComponent from "../components/buttons/BorderedButtonComponent.tsx";
import ErrorBanner from "../components/ErrorBanner.tsx";

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
  const [status, setStatus] = useState<string | "OK">();
  const [loading, setLoading] = useState(false);

  const changeTournamentCode = (code: string) => {
    if (/^\d*$/.test(code) && code.length <= 6) {
      setTournamentCode(code);
      setStatus(undefined);
    }
  };

  const changePlayerName = (name: string) => {
    setPlayerName(name);
    setStatus(undefined);
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
    <div>
      <div className="flex fixed md:top-0 md:right-5 w-full justify-center md:justify-end">
        <ButtonComponent linkPath="/" text={"Back"} />
      </div>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className=" items-center size-80 w-full py-10">
          <DisplayLogo />
        </div>

        <InputComponent
          value={tournamentCode}
          callback={changeTournamentCode}
          placeholder={"6 DIGIT ROOM CODE"}
          disabled={loading}
          data-testid={"tournament-code-input"}
          additionalClass={"large-input"}
        />
        <InputComponent
          value={playerName}
          callback={changePlayerName}
          placeholder={"NAME"}
          disabled={loading}
          data-testid={"player-name-input"}
          additionalClass={"large-input"}
        />

        <FormButton
          text={"JOIN GAME"}
          loading={loading}
          callback={joinTournament}
          additionalClass={"large-btn"}
        />
      </div>
      {!status || status === "OK" ? null : (
        <ErrorBanner
          message={status}
          removeError={() => {
            setStatus(undefined);
          }}
        />
      )}
    </div>
  );
};

export default JoinTournament;
