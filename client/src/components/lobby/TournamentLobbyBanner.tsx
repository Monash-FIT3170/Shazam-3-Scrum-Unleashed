import DisplayLogo from "../DisplayLogo.tsx";
import lightning from "../../assets/logo/Lightning.svg";

type TournamentLobbyBannerProps = {
  tournamentCode: string;
  qrCode: string;
};

const TournamentLobbyBanner = ({
  tournamentCode,
  qrCode,
}: TournamentLobbyBannerProps) => {
  return (
    <div className="w-full flex flex-row justify-start items-center py-6 gap-10">
      <div className="w-80">
        <DisplayLogo />
      </div>

      <div className="flex flex-row justify-stretch items-center border-8 border-white rounded-2xl w-full min-w-max h-40 p-4">
        <div className="min-w-7/12 flex flex-col items-start">
          <div className="text-white text-2xl font-bold uppercase">
            JOIN THE TOURNAMENT AT
          </div>
          <div className="text-paper text-5xl font-bold uppercase">
            <span className="text-rock">{window.location.host}</span>
            <span className="text-shazam">/</span>
            <span>{tournamentCode}</span>
          </div>
        </div>
        <img src={lightning} alt="Lightning Bolt" className="pl-4 scale-90" />
        <div className="w-4/12 flex flex-col items-center">
          <div className="text-white text-xl font-bold uppercase">
            Tournament Code:
          </div>
          <div
            className="text-paper text-7xl font-bold uppercase "
            data-testid="tournament-code"
          >
            {tournamentCode}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-stretch items-center border-8 border-white bg-white rounded-2xl min-w-40 h-40 gap-4 overflow-clip">
        {qrCode === "" ? (
          <span className="text-white text-2xl font-bold uppercase box-content">
            Loading QR Code
          </span>
        ) : (
          <img src={qrCode} className="scale-110" alt="QR Code" />
        )}
      </div>
    </div>
  );
};

export default TournamentLobbyBanner;
