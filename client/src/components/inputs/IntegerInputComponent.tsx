import { useState } from "react";

type IntegerInputComponentProps = {
  placeholder: number;
  min: number;
  max: number
  callback: (value: number) => void;
  errorCallback: (bool: boolean) => void;
};

const IntegerInputComponent = ({
  placeholder,
  min,
  max,
  callback,
  errorCallback,
}: IntegerInputComponentProps) => {
  const [value, setValue] = useState<number | string>(placeholder);
  const [hasError, setHasError] = useState(false);
  return (
    <input
      className={`py-2 px-5 bg-[#14171D] border-2 rounded-xl w-1/3 focus:outline-none focus:ring-1
      ${
        hasError
          ? "text-bright-red border-bright-red focus:ring-bright-red"
          : "text-white border-white focus:ring-blue-400 focus:border-blue-400"
      }`}
      value={value}
      onChange={(event) => {
        if (event.target.value == "") {
          setHasError(true);
          errorCallback(true);
          setValue("");
        } else if (/^[1-9][0-9]*$/.test(event.target.value)) {
          if (Number(event.target.value) > max || Number(event.target.value) < min) {
            setHasError(true);
            errorCallback(true);
            setValue(event.target.value);
          }
          else {
            setHasError(false);
            errorCallback(false);
            setValue(parseInt(event.target.value));
            callback(parseInt(event.target.value));
          }
        }
      }}
    />
  );
};

export default IntegerInputComponent;
