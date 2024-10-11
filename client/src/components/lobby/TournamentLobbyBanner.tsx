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
      <div className="w-80 animate-enterAndShake [--shake-delay:0.25s]">
        <DisplayLogo />
      </div>

      <div className="flex flex-row justify-stretch items-center border-8 border-white rounded-2xl w-full min-w-max h-40 p-4">
        <div className="min-w-7/12 flex flex-col items-start">
          <div className="text-white text-2xl font-bold uppercase">
            JOIN THE TOURNAMENT AT
          </div>
          <div className="text-5xl font-bold uppercase select-text">
            <span className="text-rock">{window.location.host}</span>
            <span className="text-shazam">/</span>
            <span className="text-paper">{tournamentCode}</span>
          </div>
        </div>
        <img
          src={lightning}
          alt="Lightning Bolt"
          className="pl-4 [height:160%] animate-enterAndShake [--shake-delay:0.1s]"
        />
        <div className="w-4/12 flex flex-col items-center">
          <div className="text-white text-xl font-bold uppercase">
            Tournament Code:
          </div>
          <div
            className="text-paper text-7xl font-bold uppercase select-text"
            data-testid="tournament-code"
          >
            {tournamentCode}
          </div>
        </div>
      </div>
      <div className="items-center border-8 border-white bg-white rounded-2xl min-w-40 animate-enterAndShake overflow-clip">
        {qrCode === "" ? (
          <span className="text-white text-2xl font-bold uppercase box-content">
            Loading QR Code
          </span>
        ) : (
          <img
            src={qrCode}
            className="h-full w-full object-cover scale-110"
            alt="QR Code"
          />
        )}
      </div>
    </div>
  );
};

export default TournamentLobbyBanner;
