import { Link } from "react-router-dom";

type ButtonInputs = {
  linkPath: string;
  image: string;
  onClick?: () => void;
};

const LargeButton = ({ linkPath, image }: ButtonInputs) => {
  return (
    <div className="w-5/12 h-52 md:w-5/12 md:h-48 lg:w-112 lg:h-72">
      <Link to={linkPath}>
        <button className="text-white w-full h-full font-bold rounded-xl border-white border-4 flex items-center justify-center">
          <img src={image} alt="Button icon" className="h-56 object-contain" />
        </button>
      </Link>
    </div>
  );
};

export default LargeButton;
