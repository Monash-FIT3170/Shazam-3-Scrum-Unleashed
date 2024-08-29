import React from "react";

interface PopupProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TournamentPopup: React.FC<PopupProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  if (!show) return null; // Return null if the popup should not be shown

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="relative bg-[#2a2a72] text-white p-6 rounded-lg w-full max-w-md md:max-w-lg text-center border border-white">
        <h2 className="text-2xl font-bold mb-4">START TOURNAMENT</h2>
        <p className="text-lg mb-6">
          ARE YOU SURE YOU WANT TO START THE TOURNAMENT?
        </p>

        {/* Button Container */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Confirm Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl border-white border-4 text-3xl w-80 md:w-48 lg:w-56 py-2 px-4"
            onClick={onConfirm}
          >
            Confirm
          </button>
          {/* Cancel Button */}
          <button
            className="text-white font-bold rounded-xl border-white border-4 text-3xl w-80 md:w-48 lg:w-56 py-2 px-4"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentPopup;
