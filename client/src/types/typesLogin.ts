export interface UserFormLogin {
  email: string;
  password: string;
}

export interface UserFormErrorLogin {
  emailError: string | null;
  passwordError: string | null;
}

export interface InputProps {
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
