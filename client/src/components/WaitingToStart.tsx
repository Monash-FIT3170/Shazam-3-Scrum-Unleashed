const WaitingToStart = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Large text in the center */}
      <h1 className="text-white text-5xl font-bold mb-80 ">
        WAITING FOR HOST TO START THE GAME...
      </h1>

      {/* Text in the bottom left */}
      <div className="fixed bottom-30 left-20 xl:left-10">
        <p className="text-white text-lg font-bold mb-2">YOUR NICKNAME:</p>
        <p className="text-white text-3xl font-bold">{"Johnny"}</p>
      </div>

      {/* Text in the bottom right */}
      <div className="fixed bottom-30 right-20">
        <p className="text-white text-lg font-bold mb-2">TOURNAMENT CODE:</p>
        <p className="text-white text-3xl font-bold">{"000000"}</p>
      </div>
    </div>
  );
};

export default WaitingToStart;
