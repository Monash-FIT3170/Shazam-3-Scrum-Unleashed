import { useState } from "react";
import "./App.css";
import DisplayIcon from "./Components/DisplayIcon"
import Home from "./Pages/Home";

function App() {

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div ><Home/>

      </div>
    </div>
  );
}

export default App;
