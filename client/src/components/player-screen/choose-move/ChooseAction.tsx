import { useState } from "react";
import MoveSelection from "./MoveSelection.tsx";
import MoveKiller from "../../../assets/choose-move/MoveKiller.svg";
import Shield from "../../../assets/choose-move/Shield.svg";
import Tiebreak from "../../../assets/choose-move/Tiebreak.svg";
import { Selection, Powerup } from "../../../../../types/types.ts";

interface ChoosePlayerPowerupProps {
    tournamentCode: string;
}

const ChoosePowerup = ({ tournamentCode }: ChoosePlayerPowerupProps) => {
    const [selectedPowerup, setSelectedPowerup] = useState<Powerup | null>(null);

    const handlePowerUpSelection = (move: Selection) => {
        if (!selectedPowerup) {
            setSelectedPowerup(move as Powerup);
            // Remove console log once socket is implemented
            console.log(tournamentCode);
            //socket.emit("POWERUP", tournamentCode, socket.userID, move);
        }
    };

    return (
        <>
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center w-full">
                <p className="text-white text-3xl font-bold mb-9">CHOOSE A POWERUP</p>
                <div className="flex justify-center items-center">
                    <MoveSelection
                        img={Shield}
                        selection="ROCK"
                        onSelectMove={handlePowerUpSelection}
                    />
                    <MoveSelection
                        img={MoveKiller}
                        selection="PAPER"
                        onSelectMove={handlePowerUpSelection}
                    />
                    <MoveSelection
                        img={Tiebreak}
                        selection="SCISSORS"
                        onSelectMove={handlePowerUpSelection}
                    />
                </div>
            </div>
        </>
    );
};
export default ChoosePowerup;