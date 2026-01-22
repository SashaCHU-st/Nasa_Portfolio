import type { UserForm, UserFormError } from "../../../types/typesSignUp";
export const initialForm: UserForm = {
  name: "",
  email: "",
  password: "",
};

export const initialFormError: UserFormError = {
  nameError: null,
  emailError: null,
  passwordError: null,
};
