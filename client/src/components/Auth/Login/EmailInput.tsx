import AuthInput from "../ui/AuthInput";
import type {
  UserFormErrorLogin,
  UserFormLogin,
} from "../../../types/typesLogin";
import { MAX_EMAIL_LENGTH } from "../model/limits";

interface EmailInputProps {
  value: string;
  error: string | null;
  updateField: (
    field: keyof UserFormLogin,
    errorField: keyof UserFormErrorLogin,
    value: string,
    maxLength: number,
    errorMessage: string,
  ) => void;
}

const EmailInput = ({ value, error, updateField }: EmailInputProps) => {
  return (
    <AuthInput
      type="email"
      placeholder="Please write your email * "
      value={value}
      error={error}
      onChange={(nextValue) =>
        updateField(
          "email",
          "emailError",
          nextValue,
          MAX_EMAIL_LENGTH,
          "Email must be max 40 characters",
        )
      }
    />
  );
};

export default EmailInput;
