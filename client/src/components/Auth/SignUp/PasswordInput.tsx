import AuthInput from "../ui/AuthInput";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  error?: string | null;
  onChange: (value: string) => void;
}

interface PasswordInputProps extends Omit<InputProps, "type" | "placeholder"> {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

const PasswordInput = ({
  value,
  error,
  onChange,
  showPassword,
  setShowPassword,
}: PasswordInputProps) => {
  return (
    <AuthInput
      type={showPassword ? "text" : "password"}
      placeholder="Please write your password * "
      value={value}
      error={error}
      className="font-orbitron uppercase border-4 border-gray-500 rounded my-4 p-4 w-full text-gray-200"
      wrapperClassName="w-96"
      action={{
        label: showPassword ? "🙈" : "👁️",
        onClick: () => setShowPassword(!showPassword),
      }}
      onChange={onChange}
    />
  );
};

export default PasswordInput;
