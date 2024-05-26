import DisplayLogo from "../DisplayLogo.tsx";
import { BASE_PATH } from "../../pages/pagePaths.ts";
import lightning from "../../assets/Lightning.svg";

type TournamentLobbyBannerProps = {
  tournamentCode: string;
  qrCode: string;
};

const TournamentLobbyBanner = ({
  tournamentCode,
  qrCode,
}: TournamentLobbyBannerProps) => {
  return (
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
          <div className="text-red text-5xl font-bold uppercase " data-testid="tournament-code">
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
  );
};

export default TournamentLobbyBanner;
