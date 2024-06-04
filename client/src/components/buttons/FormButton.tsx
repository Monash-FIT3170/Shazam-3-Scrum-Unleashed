type FormButtonInputs = {
  text: string;
  error: string | null;
  loading: boolean;
  callback: () => void;
};

const FormButtonComponent = ({
  text,
  error,
  loading,
  callback,
}: FormButtonInputs) => {
  return (
    <button
      className={`h-12 mt-8 text-white ${error !== null ? "bg-bright-red" : "bg-primary"} text-2xl font-bold w-1/3 rounded-xl`}
      onClick={callback}
      disabled={loading || error !== null}
    >
      {loading ? "Loading..." : error !== null ? error : text}
    </button>
  );
};

export default FormButtonComponent;
