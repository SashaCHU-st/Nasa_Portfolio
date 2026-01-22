import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/InputValidation";
import type { UserForm } from "../../../types/typesSignUp";
import type { UserFormLogin } from "../../../types/typesLogin";

export const validateForm = (userForm: UserForm) => {
  const emailErr = validateEmail(userForm.email);
  const passwordErr = validatePassword(userForm.password);
  const nameError = validateName(userForm.name);

  return { emailErr, passwordErr, nameError };
};

export const validateFormLogin = (userForm: UserFormLogin) => {
  const emailErr = validateEmail(userForm.email);
  const passwordErr = validatePassword(userForm.password);

  return { emailErr, passwordErr };
};
