import PlayerName from "./PlayerNameMobile.tsx";
import StarsInfo from "./StarsInfo.tsx";
import SpectatorCount from "./SpectatorCount.tsx";
import { PlayerAttributes } from "../../../../../types/types.ts";

type PlayerAndSpectatorsInfoProps = {
  userPlayer: PlayerAttributes;
  opponent: PlayerAttributes;
  isSpectator: boolean;
  duelsToWin: number;
};

const PlayerAndSpectatorsInfo = ({
  userPlayer,
  opponent,
  isSpectator,
  duelsToWin,
}: PlayerAndSpectatorsInfoProps) => {
  return (
    <div>
      <div className="hidden">
        <PlayerName name={opponent.name} isOpponent={true} />
      </div>
      <div className="block">
        <StarsInfo
          playerName={opponent.name}
          score={opponent.score}
          duelLimit={duelsToWin}
          isOpponent={true}
          isSpectator={isSpectator}
        />
      </div>

      <div className="hidden">
        <PlayerName name={userPlayer.name} isOpponent={false} />
      </div>
      <div className="block">
        <StarsInfo
          playerName={userPlayer.name}
          score={userPlayer.score}
          duelLimit={duelsToWin}
          isOpponent={false}
          isSpectator={isSpectator}
        />
      </div>

      <div className="hidden md:block">
        <SpectatorCount count={userPlayer.spectatorIDs.length} />
      </div>
    </div>
  );
};

export default PlayerAndSpectatorsInfo;
