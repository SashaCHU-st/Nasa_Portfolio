import AuthInput from "../ui/AuthInput";
import { MAX_NAME_LENGTH } from "../model/limits";
import type { UserForm, UserFormError } from "../../../types/typesSignUp";

interface InputProps {
  value: string;
  error: string | null;
  updateField: (
    field: keyof UserForm,
    errorField: keyof UserFormError,
    value: string,
    maxLength: number,
    errorMessage: string,
  ) => void;
}

const NameInput = ({ value, error, updateField }: InputProps) => {
  const handleNameChange = (value: string) => {
    updateField(
      "name",
      "nameError",
      value,
      MAX_NAME_LENGTH,
      "Name must be max 15 characters",
    );
  };
  return (
    <AuthInput
      type="text"
      placeholder="Please write your name * "
      value={value}
      error={error}
      onChange={handleNameChange}
    />
  );
};

export default NameInput;
