import IntegerInputComponent from "./IntegerInputComponent.tsx";

type CreateGameInput = {
  inputText: string;
  placeholder: number;
  callback: (value: number) => void;
  errorCallback: (bool: boolean) => void;
  transparentUnits: boolean;
};

const CreateTournamentInput = ({
  inputText,
  placeholder,
  callback,
  transparentUnits,
  errorCallback,
}: CreateGameInput) => {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-white text-2xl uppercase">{inputText}</span>
      <div
        className={`flex justify-center items-center gap-2 ${transparentUnits ? "text-transparent" : "text-white"} font-bold`}
      >
        <IntegerInputComponent
          placeholder={placeholder}
          callback={callback}
          errorCallback={errorCallback}
        />
        <span>SECS</span>
      </div>
    </div>
  );
};

export default CreateTournamentInput;
