import AuthInput from "../ui/AuthInput";
import { MAX_PASSWORD_LENGTH } from "../model/limits";
import type {
  UserFormErrorLogin,
  UserFormLogin,
} from "../../../types/typesLogin";

interface PasswordInputProps {
  value: string;
  error: string | null;
  updateField: (
    field: keyof UserFormLogin,
    errorField: keyof UserFormErrorLogin,
    value: string,
    maxLength: number,
    errorMessage: string,
  ) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

const PasswordInput = ({
  value,
  error,
  updateField,
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
      onChange={(nextValue) =>
        updateField(
          "password",
          "passwordError",
          nextValue,
          MAX_PASSWORD_LENGTH,
          "Password must be max 40 characters",
        )
      }
    />
  );
};

export default PasswordInput;
