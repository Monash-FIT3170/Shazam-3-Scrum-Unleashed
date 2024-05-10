interface PlayerNameProps {
  name: string;
  isOpponent: boolean;
}

const PlayerName = ({ name, isOpponent }: PlayerNameProps) => {
  return (
    <div
      className={
        "fixed text-2xl text-white font-bold font-sans" +
        ` ${isOpponent ? "top-1 right-3" : "bottom-1 left-3 flex"}`
      }
    >
      {name}
    </div>
  );
};

export default PlayerName;
