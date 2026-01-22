interface AuthInputAction {
  label: string;
  onClick: () => void;
}

interface AuthInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  wrapperClassName?: string;
  action?: AuthInputAction;
}

const AuthInput = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  wrapperClassName,
  action,
}: AuthInputProps) => {
  const wrapperClasses = action
    ? `relative ${wrapperClassName || "w-96"}`
    : wrapperClassName || "";

  return (
    <div className={wrapperClasses}>
      {error ? (
        <p
          className="font-orbitron uppercase text-l sm:text-l md:text-l font-bold text-red-600 tracking-widest
                   text-center"
        >
          {error}
        </p>
      ) : null}
      <input
        className="font-orbitron uppercase border-4 border-gray-500 rounded my-4 p-4 w-96 text-gray-200"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {action ? (
        <button
          type="button"
          className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
};

export default AuthInput;
