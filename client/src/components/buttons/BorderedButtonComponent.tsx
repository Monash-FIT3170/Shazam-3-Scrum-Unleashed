import { Link } from "react-router-dom";

type ButtonInputs = {
  linkPath: string;
  text: string;
  large?: boolean; // Add the large boolean prop
  onClick?: () => void;
};

const ButtonComponent = ({ linkPath, text, large = false, onClick }: ButtonInputs) => {
  return (
    <div className={`mt-8 ${large ? "h-24" : "h-14"}`}>
      <Link to={linkPath}>
        <button
          className={`text-white font-bold rounded-xl border-white border-4 ${
            large
              ? "text-7xl w-11/12 h-52 md:w-112 lg:w-136"
              : "text-3xl w-80 md:w-96 lg:w-122"
          } h-full`}
          onClick={onClick}
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default ButtonComponent;
