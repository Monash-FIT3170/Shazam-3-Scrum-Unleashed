import {useState} from "react";

type IntegerInputComponentProps = {
    placeholder:number;
    callback:(value:number)=>void;
}


const IntegerInputComponent = ({placeholder, callback}:IntegerInputComponentProps) => {
    const [value, setValue] = useState(placeholder);
    const [hasError, setHasError] = useState(false);
  return (
    <input
      className={`py-2 px-5 bg-[#14171D] border-2 rounded-xl w-1/2 focus:outline-none focus:ring-1 ${hasError ? "text-bright-red border-bright-red focus:ring-bright-red":"text-white border-white focus:ring-blue-400 focus:border-blue-400"}`}
      value={value}
      type={"number"}
      onChange={(event) => {
        if (!/^\d+$/.test(event.target.value)) {
            setHasError(true);
            setValue(parseInt(event.target.value))
        } else {
            setHasError(false);
            setValue(parseInt(event.target.value))
            callback(parseInt(event.target.value));
        }
      }}
    />
  );
};

export default IntegerInputComponent;
