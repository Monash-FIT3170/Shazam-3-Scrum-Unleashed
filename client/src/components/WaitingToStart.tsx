import DisplayLogo from "./DisplayLogo";

type WaitingToStartProps = {
  playerName: string;
  tournamentCode: string;
};

const WaitingToStart = ({
  playerName,
  tournamentCode,
}: WaitingToStartProps) => {
  return (
    <>
      <div className=" items-center size-60 w-full">
        <DisplayLogo />
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Large text in the center */}
        <h1 className="text-white md:text-5xl text-4xl font-bold ">
          WAITING FOR HOST...
        </h1>

        {/* Text in the bottom left */}
        <div className="fixed bottom-10 md:left-20 left-5">
          <p className="text-white md:text-lg text-sm font-bold mb-2">
            YOUR NICKNAME:
          </p>
          <p className="text-white md:text-3xl font-bold">{playerName}</p>
        </div>

        {/* Text in the bottom right */}
        <div className="fixed bottom-10 md:right-20 right-5">
          <p className="text-white md:text-lg text-sm font-bold mb-2">
            TOURNAMENT CODE:
          </p>
          <p
            className="text-white md:text-3xl font-bold"
          >
            {tournamentCode}
          </p>
        </div>
      </div>
    </>
  );
};

export default WaitingToStart;
