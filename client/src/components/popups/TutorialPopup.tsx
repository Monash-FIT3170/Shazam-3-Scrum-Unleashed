import React from "react";

interface TutorialPopupProps {
  show: boolean;
  onClose: () => void;
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({ show, onClose }) => {
  if (!show) return null;

  const rpsPopupContent = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mt-4">Rock Paper Scissors (RPS)</h2>
        <p className="text-m mt-2">
          Overcome your opponents by choosing an action that beats theirs!
        </p>
        <p className="text-m mt-2">
          Rock beats Scissors, Scissors beats Paper, Paper beats Rock. Choosing
          the same move is a tie.
        </p>
        <p className="text-m mt-2">
          You have a limited amount of time to choose your move.
        </p>
      </div>
    );
  };

  const pongPopupContent = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mt-4">Pong</h2>
        <p className="text-m mt-2">
          Beat your opponents by hitting the ball past their paddle into their
          goal!
        </p>
        <p className="text-m mt-2">
          Move your paddle left and right using their respective buttons on
          screen or the left and right arrow keys (keyboard).
        </p>
        <p className="text-m mt-2">
          The longer a duel goes on for, the faster the ball gets.
        </p>
      </div>
    );
  };

  const rpsPowerupContent = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mt-4">RPS Powerups</h2>
        <p className="text-m mt-2">
          Powerups can spawn on one of the moves and you can only use and store
          one.
        </p>
        <p className="text-m mt-2">
          Choosing that action will give you a random powerup if your opponent
          doesn&apos;t also choose that action.
        </p>
        <p className="text-m mt-2">
          Powerups include Move Killer, Shield and Tie Breaker.
        </p>
        <p className="text-m mt-2">
          <a className="font-bold">Move Killer</a> will remove the
          opponent&apos;s ability to select a move
        </p>
        <p className="text-m mt-2">
          <a className="font-bold">Shield</a> will protect you from losing the
          current duel
        </p>
        <p className="text-m mt-2">
          <a className="font-bold">Tie Breaker</a> will win in the instance of a
          tie
        </p>
        <br></br>
      </div>
    );
  };

  const pongPowerupContent = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mt-4">Pong Powerups</h2>
        <p className="text-m mt-2">
          Powerups may spawn on field and if you hit a ball into it you gain the
          powerup for a short period of time.
        </p>
        <p className="text-m mt-2">
          Powerups include Bigger Paddle, Shrunken Paddle and Invert Controls.
        </p>
        <p className="text-m">
          <a className="font-bold">Bigger Paddle</a> will increase the size of
          your paddle
        </p>
        <p className="text-m">
          <a className="font-bold">Shrunken Paddle</a> will decrease the size of
          your opponent&apos;s paddle
        </p>
        <p className="text-m">
          <a className="font-bold">Invert Controls</a> will reverse the
          direction of your opponent&apos;s paddle movement
        </p>
        <br></br>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="relative bg-back text-white p-2 rounded-lg md:max-h-lg w-full max-w-md md:max-w-lg text-center border-4 border-white normal-case">
        <div className="max-h-[60vh] overflow-y-scroll p-2 custom-scrollbar">
          <h1 className="text-3xl font-bold uppercase">How to Play</h1>
          <h2 className="text-xl font-bold mt-4">Aim of the Game</h2>
          <p className="text-m mt-2">
            Beat all of your opponents in matches to become the final winner!
          </p>

          {/* link to inputs from the tournament*/}
          {rpsPopupContent()}
          {rpsPowerupContent()}
          {pongPopupContent()}
          {pongPowerupContent()}
        </div>

        <button
          className="bg-primary hover:bg-primary-light-dark text-white font-bold rounded-xl border-4 border-white text-3xl w-80 md:w-48 lg:w-56 py-2 px-4"
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default TutorialPopup;
