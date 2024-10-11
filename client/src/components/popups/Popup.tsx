import React from "react";

interface PopupProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  show,
  onClose,
  onConfirm,
  children,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="relative bg-back text-white p-6 rounded-lg w-full max-w-md md:max-w-lg text-center border-4 border-white">
        {/* Children Content */}
        {children}

        {/* Button Container */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Confirm Button */}
          <button
            className="bg-primary hover:bg-primary text-white font-bold rounded-xl border-4 border-primary text-3xl w-80 md:w-48 lg:w-56 py-2 px-4"
            onClick={onConfirm}
          >
            CONFIRM
          </button>
          {/* Cancel Button */}
          <button
            className="text-white font-bold rounded-xl border-white border-4 text-3xl w-80 md:w-48 lg:w-56 py-2 px-4"
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
