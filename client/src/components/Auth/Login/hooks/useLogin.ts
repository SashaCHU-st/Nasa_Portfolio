import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { loginRequest } from "../../../../api/apiAuth";
import {
  initialFormErrorLogin,
  initialFormLogin,
} from "../../model/initialFormLogin";
import type {
  UserFormErrorLogin,
  UserFormLogin,
} from "../../../../types/typesLogin";
import { validateFormLogin } from "../../utils/validate";

export const useLogin = () => {
  const [userFormLogin, setUserFormLogin] =
    useState<UserFormLogin>(initialFormLogin);
  const [userFormErrorLogin, setUserFormErrorLogin] =
    useState<UserFormErrorLogin>(initialFormErrorLogin);
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const updateFieldLogin = (
    field: keyof UserFormLogin,
    errorField: keyof UserFormErrorLogin,
    value: string,
    maxLength: number,
    errorMessage: string,
  ) => {
    if (value.length <= maxLength) {
      setUserFormLogin((prev) => ({ ...prev, [field]: value }));
      setUserFormErrorLogin((prev) => ({ ...prev, [errorField]: null }));
      return;
    }
    setUserFormErrorLogin((prev) => ({ ...prev, [errorField]: errorMessage }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { emailErr, passwordErr } = validateFormLogin(userFormLogin);
    setUserFormErrorLogin((prev) => ({
      ...prev,
      emailError: emailErr,
      passwordError: passwordErr,
    }));
    if (emailErr || passwordErr) return;
    try {
      const { ok, data } = await loginRequest(userFormLogin);

      if (!ok) {
        setUserFormErrorLogin((prev) => ({
          ...prev,
          emailError: data.message || "Something went wrong",
        }));
        throw new Error(data.message || "Something went wrong");
      }
      loginUser();
      navigate("/home");
    } catch (err) {
      console.error("Error", err);
    }
  };

  return {
    userFormLogin,
    userFormErrorLogin,
    showPassword,
    setShowPassword,
    updateFieldLogin,
    handleLogin,
  };
};
