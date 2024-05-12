import { Link } from "react-router-dom";

type ButtonInputs = {
  linkPath: string;
  text: string;
};

const ButtonComponent = ({ linkPath, text }: ButtonInputs) => {
  return (
    <div className="h-14 mt-8">
      <Link to={linkPath}>
        <button className="text-white text-3xl w-80 md:w-96 lg:w-122 font-bold rounded-xl h-full border-white border-4">
          {text}
        </button>
      </Link>
    </div>
  );
};

export default ButtonComponent;
