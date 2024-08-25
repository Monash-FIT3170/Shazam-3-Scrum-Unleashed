type InputComponentProps = {
  value: string;
  callback: (value: string) => void;
  placeholder: string;
  disabled: boolean;
};

const InputComponent = ({ callback, ...props }: InputComponentProps) => {
  return (
    <input
      className="bg-primary-dark rounded-xl w-1/3 h-10 mt-4 border-2 pl-2 focus:outline-none focus:ring-1 text-white border-white focus:ring-blue-400 focus:border-blue-400"
      onChange={(event) => {
        callback(event.target.value);
      }}
      {...props}
    />
  );
};

export default InputComponent;
