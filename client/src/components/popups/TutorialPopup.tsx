import React from "react";

interface TutorialPopupProps {
    show: boolean;
    onClose: () => void;
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({ 
    show, 
    onClose,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
            <div className="relative bg-back text-white p-6 rounded-lg w-full max-w-md md:max-w-lg text-center border-4 border-white">
                <h1 className="text-3xl font-bold">How to Play</h1>
                <p className="text-xl font-bold mt-4">Rock Paper Scissors</p>
                <p className="text-lg mt-2">Rock beats Scissors, Scissors beats Paper, Paper beats Rock</p>
                <p className="text-lg mt-2">You have a limited amount of time to choose your move</p>

                <button
                    className="bg-primary hover:bg-primary text-white font-bold rounded-xl border-4 border-primary text-3xl w-80 md:w-48 lg:w-56 py-2 px-4"
                    onClick={onClose}>CLOSE
                </button>
            </div>
        </div>
    );
};

export default TutorialPopup;