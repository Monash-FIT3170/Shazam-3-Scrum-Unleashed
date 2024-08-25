type FormButtonInputs = {
  text: string;
  loading: boolean;
  callback: () => void;
};

const FormButtonComponent = ({ text, loading, callback }: FormButtonInputs) => {
  return (
    <button
      className="large-button h-12 mt-8 text-white bg-primary text-2xl font-bold rounded-xl"
      onClick={callback}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default FormButtonComponent;
