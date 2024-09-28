import { Link } from "react-router-dom";

type ButtonInputs = {
  linkPath: string;
  text: string;
  onClick?: () => void;
};

const ButtonComponent = ({ linkPath, text, onClick }: ButtonInputs) => {
  return (
    <div className="h-14">
      <Link to={linkPath}>
        <button
          className="text-white bg-primary text-3xl min-w-2 w-80 md:w-96 lg:w-122 font-bold rounded-xl h-full border-white"
          onClick={onClick}
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default ButtonComponent;
