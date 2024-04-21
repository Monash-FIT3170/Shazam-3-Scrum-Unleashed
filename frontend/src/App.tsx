import { useState } from "react";
import "./App.css";
import DisplayIcon from "./Components/DisplayIcon"
import Home from "./Pages/Home";
import JoinRoom from "./Pages/JoinRoom";

function App() {

  return (
    <div className='flex items-center justify-center w-screen mt-4'>
      <div ><JoinRoom/>

      </div>
    </div>
  );
}

export default App;
