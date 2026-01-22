import type {
  UserFormErrorLogin,
  UserFormLogin,
} from "../../../types/typesLogin";
export const initialFormLogin: UserFormLogin = {
  email: "",
  password: "",
};

export const initialFormErrorLogin: UserFormErrorLogin = {
  emailError: null,
  passwordError: null,
};
