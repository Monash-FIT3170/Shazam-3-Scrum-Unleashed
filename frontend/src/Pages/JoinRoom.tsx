import DisplayIcon from "../Components/DisplayIcon";

const JoinRoom = () => {
  return (
    <div>
      <div>
        <DisplayIcon />
      </div>
      <div>
        <h1 className="text-white font-bold mt-6 uppercase">
          {" "}
          Enter Tournament Code
        </h1>
        <div className="w-screen">
          <input
            type="text"
            placeholder="6 DIGIT ROOM CODE"
            className="bg-inputColor text-white rounded-xl w-1/3 h-10 mt-4 border-2 border-white"
          ></input>
        </div>
      </div>
      <div>
        <h1 className="text-white font-bold mt-6 uppercase"> name</h1>
        <div className="w-screen">
          <input
            type="text"
            placeholder="NAME"
            className="bg-inputColor rounded-xl w-1/3 h-10 mt-4 border-2 border-white"
          ></input>
        </div>
      </div>

      {/*add the join button here */}
      <div className="w-screen h-12 mt-8">
        <button className="text-white bg-primarybuttonColor text-2xl font-bold w-1/3 rounded-xl h-full">
          {" "}
          JOIN ROOM
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
