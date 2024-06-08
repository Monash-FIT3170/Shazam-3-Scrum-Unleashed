type FormButtonInputs = {
  text: string;
  status: string | "OK";
  loading: boolean;
  callback: () => void;
};

const FormButtonComponent = ({
  text,
  status,
  loading,
  callback,
}: FormButtonInputs) => {
  return (
    <button
      className={`h-12 mt-8 text-white ${status !== "OK" ? "bg-bright-red" : "bg-primary"} text-2xl font-bold w-1/3 rounded-xl`}
      onClick={callback}
      disabled={loading || status !== "OK"}
    >
      {loading ? "Loading..." : status !== "OK" ? status : text}
    </button>
  );
};

export default FormButtonComponent;
