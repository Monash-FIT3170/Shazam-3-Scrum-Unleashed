import DisplayLogo from "../../DisplayLogo.tsx";
import LoadingEffect from "./LoadingEffect.tsx";

type WaitingToStartProps = {
  playerName: string;
  tournamentCode: string;
};

const WaitingForMatchStart = ({
  playerName,
  tournamentCode,
}: WaitingToStartProps) => {
  return (
    <>
      <div className=" items-center size-60 w-full">
        <DisplayLogo />
      </div>
      <LoadingEffect isOpponent={false} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white md:text-5xl text-4xl font-bold ">
          WAITING FOR MATCH...
        </h1>

        <div className="fixed bottom-10 md:left-20 left-5">
          <p className="text-white md:text-lg text-sm font-bold mb-2">
            YOUR NICKNAME:
          </p>
          <p className="text-white md:text-3xl font-bold">{playerName}</p>
        </div>

        <div className="fixed bottom-10 md:right-20 right-5">
          <p className="text-white md:text-lg text-sm font-bold mb-2">
            TOURNAMENT CODE:
          </p>
          <p className="text-white md:text-3xl font-bold">{tournamentCode}</p>
        </div>
      </div>
    </>
  );
};

export default WaitingForMatchStart;
