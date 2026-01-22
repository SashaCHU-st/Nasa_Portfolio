import AuthInput from "../ui/AuthInput";
import type { InputProps } from "../../../types/typesSignUp";
import { MAX_EMAIL_LENGTH } from "../model/limits";

const EmailInput = ({ value, error, updateField }: InputProps) => {
  return (
    <AuthInput
      type="email"
      placeholder="Please write your email * "
      value={value}
      error={error}
      onChange={(value) =>
        updateField(
          "email",
          "emailError",
          value,
          MAX_EMAIL_LENGTH,
          "Email must be max 40 characters",
        )
      }
    />
  );
};

export default EmailInput;
