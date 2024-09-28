import IntegerInputComponent from "./IntegerInputComponent.tsx";

type CreateGameInput = {
  inputText: string;
  placeholder: number;
  min: number;
  max: number;
  callback: (value: number) => void;
  errorCallback: (bool: boolean) => void;
  transparentUnits: boolean;
  hasMinutes?: boolean;
};

const CreateTournamentInput = ({
  inputText,
  placeholder,
  min,
  max,
  callback,
  transparentUnits,
  errorCallback,
}: CreateGameInput) => {
  return (
    <div className="flex justify-between items-center lg:w-2/3 w-full">
      <span className="text-white text-md lg:text-2xl uppercase font-bold">
        {inputText}
      </span>
      <div
        className={`flex justify-center items-center gap-5 ${transparentUnits ? "text-transparent" : "text-white"} font-bold`}
      >
        <IntegerInputComponent
          placeholder={placeholder}
          min={min}
          max={max}
          callback={callback}
          errorCallback={errorCallback}
        />

        <span>SECS</span>
      </div>
    </div>
  );
};

export default CreateTournamentInput;
