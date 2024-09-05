import closeSymbol from "../assets/misc/Close.svg";
import errorSymbol from "../assets/misc/OutlinedError.svg";

type BannerProps = {
  message: string | undefined;
  removeError: () => void;
};

const ErrorBanner = ({ message, removeError }: BannerProps) => {
  return (
    <div
      id="bottom-banner"
      className="fixed bottom-0 start-0 z-50 flex justify-between w-full h-32 p-4 bg-saturated-red"
    >
      <div className="flex items-center mx-auto">
        <img src={errorSymbol} alt={"Error"} />
        <p className="flex font-bold text-3xl text-white pl-2">{message}</p>
      </div>
      <div className="flex items-center">
        <button
          data-dismiss-target="#bottom-banner"
          type="button"
          className="text-white hover:bg-red rounded-lg"
          onClick={() => removeError()}
        >
          <img src={closeSymbol} alt={"Close Error Banner"} />
          <span className="sr-only">Close banner</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorBanner;
