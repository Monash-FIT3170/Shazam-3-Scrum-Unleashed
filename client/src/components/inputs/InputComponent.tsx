type InputComponentProps = {
  value: string;
  callback: (value: string) => void;
  error: string |null;
  placeholder:string;
  testid:string;
};

const InputComponent = ({
  value,
  callback, error, placeholder,testid
}: InputComponentProps) => {

  return (

    <input
      className={`bg-primary-dark rounded-xl w-1/3 h-10 mt-4 border-2 pl-2 focus:outline-none focus:ring-1
      ${
          error !== null
          ? "text-bright-red border-bright-red focus:ring-bright-red"
          : "text-white border-white focus:ring-blue-400 focus:border-blue-400"
      }`}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        callback(event.target.value)
      }}
      data-testid={testid}
    />

  );
};

export default InputComponent;
