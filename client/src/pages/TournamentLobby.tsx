import DisplayLogo from "../components/DisplayLogo.tsx";

import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerAttributes } from "../../../types/types.ts";
import { socket } from "../App.tsx";
import { BASE_PATH, JOIN_GAME_PATH } from "./pagePaths.ts";
import PlayerCard from "../components/PlayerCard.tsx";
import lightning from "../assets/Lightning.svg";

async function fetchQrCode(
  returnUrl: string,
  setQrCode: (qrCode: string) => void,
) {
  const qrcode = await fetch(
    // TODO: Make this an environment variable
    "http://localhost:3010/qr-code/" + encodeURIComponent(returnUrl),
  );
  const qrCode = await qrcode.json();
  setQrCode(qrCode.qrCode);
}

const TournamentLobby = () => {
  const { tournamentCode } = useLoaderData() as { tournamentCode: string };
  const [players, setPlayers] = useState<PlayerAttributes[]>([]);
  const [qrCode, setQrCode] = useState("");
  // const navigate = useNavigate();

  useEffect(
    () =>
      void fetchQrCode(
        `${window.location.origin}/${BASE_PATH}/${JOIN_GAME_PATH}?tournamentCode=${tournamentCode}`,
        setQrCode,
      ),
    [],
  );

  const updateList = (player: PlayerAttributes) => {
    setPlayers((previousPlayers) => [...previousPlayers, player]);
  };

  const startTournament = () => {
    // Call the ALLOCATE_PLAYERS socket event
    socket.emit("START_TOURNAMENT", tournamentCode);
  };

  useEffect(() => {
    socket.on("PLAYER_HAS_JOINED", (player) => {
      console.log(player);
      updateList(player);
      console.log(`Player ${player.name} has joined`);
    });

    socket.on("ROUND_STARTED", () => {
      console.log("Tournament Started");
    });

    return () => {
      socket.off("PLAYER_HAS_JOINED");
      socket.off("ROUND_STARTED");
    };
  }, []);

  return (
    <div>
      <div>
        <div className="w-full flex flex-row justify-start items-center py-4 px-5 gap-10">
          <div className="w-80">
            <DisplayLogo />
          </div>

          <div className="flex flex-row justify-stretch items-center border-8 border-white rounded-2xl w-full h-40 gap-4">
            <div className="w-1/2 flex flex-col items-center">
              <div className="text-white text-2xl font-bold uppercase">
                JOIN THE TOURNAMENT AT
              </div>
              <div className="text-red text-3xl font-bold uppercase ">
                {BASE_PATH.substring(1, BASE_PATH.length - 1)}
              </div>
              {/*// todo fix*/}
            </div>
            <img src={lightning} alt="Lightning Bolt" />
            <div className="flex flex-col items-center">
              <div className="text-white text-xl font-bold uppercase">
                Tournament Code
              </div>
              <div className="text-red text-5xl font-bold uppercase ">
                {tournamentCode}
              </div>
            </div>
          </div>

          {qrCode === "" ? (
            <span>loading...</span>
          ) : (
            <img
              src={qrCode}
              alt="QR Code"
              className="flex justify-center h-48 border-8 rounded-2xl border-white"
            />
          )}
        </div>
      </div>

      <div className="player-bar flex flex-row justify-between items-center px-10 h-16">
        <div className="text-white text-xl uppercase ">
          Players: {players.length}
        </div>

        <button
          className="hover:bg-blue-700 text-white bg-primary text-xl font-bold rounded-xl h-full uppercase w-1/4"
          onClick={startTournament}
        >
          Start Tournament
        </button>
      </div>

      <div className="player-list">
        {players.map((player, index) => (
          <PlayerCard key={player.userID} player={player} cardNum={index} />
        ))}
      </div>
    </div>
  );
};

export default TournamentLobby;
