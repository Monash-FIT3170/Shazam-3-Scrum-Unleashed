import DisplayIcon from "../Components/DisplayIcon";

const Home = () => {
  return (
    <div>
      <div>
        <DisplayIcon />
      </div>
      <div className="w-screen h-12 mt-8">
        <button className="text-white bg-primarybuttonColor text-2xl font-bold w-1/3 rounded-xl h-full">
          {" "}
          JOIN ROOM
        </button>
      </div>
      <div className="w-screen h-12 mt-4">
        <button className="text-white bg-primarybuttonColor text-2xl font-bold w-1/3 rounded-xl h-full">
          {" "}
          CREATE ROOM
        </button>
      </div>
    </div>
  );
};

export default Home;
