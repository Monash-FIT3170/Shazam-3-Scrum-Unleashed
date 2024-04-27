import DisplayLogo from "../fuckUppercase/DisplayLogo";

const Home = () => {
  return (
    <div>
      <div>
        <DisplayLogo />
      </div>
      <div className="w-screen h-12 mt-8">
        <button className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full">
          JOIN ROOM
        </button>
      </div>
      <div className="w-screen h-12 mt-4">
        <button className="text-white bg-primary text-2xl font-bold w-1/3 rounded-xl h-full">
          CREATE ROOM
        </button>
      </div>
    </div>
  );
};

export default Home;
