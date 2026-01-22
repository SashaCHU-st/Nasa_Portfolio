import type { UserFormErrorLogin, UserFormLogin } from "./typesLogin";

export interface UserForm {
  name: string;
  email: string;
  password: string;
}

export interface UserFormError {
  nameError: string | null;
  emailError: string | null;
  passwordError: string | null;
}

export interface InputProps {
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

export interface InputPropsLogin {
  value: string;
  error: string | null;
  updateFieldLogin: (
    field: keyof UserFormLogin,
    errorField: keyof UserFormErrorLogin,
    value: string,
    maxLength: number,
    errorMessage: string,
  ) => void;
}
