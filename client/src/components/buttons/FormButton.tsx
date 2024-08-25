type FormButtonInputs = {
  text: string;
  loading: boolean;
  callback: () => void;
  additionalClass?: string;
};

const FormButtonComponent = ({ text, loading, callback, additionalClass }: FormButtonInputs) => {
  return (
    <button
      className={`h-12 mt-8 text-white bg-primary text-2xl font-bold w-1/3 rounded-xl ${additionalClass ?? ""}`}
      onClick={callback}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default FormButtonComponent;
