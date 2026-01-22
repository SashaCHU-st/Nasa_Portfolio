import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { signUpRequest } from "../../../../api/apiAuth";
import { initialForm, initialFormError } from "../../model/initialFormSignUp";
import type { UserForm, UserFormError } from "../../../../types/typesSignUp";
import { validateForm } from "../../utils/validate";

export const useSignUp = () => {
  const [userForm, setUserForm] = useState<UserForm>(initialForm);
  const [userFormError, setUserFormError] =
    useState<UserFormError>(initialFormError);
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const updateField = (
    field: keyof UserForm,
    errorField: keyof UserFormError,
    value: string,
    maxLength: number,
    errorMessage: string,
  ) => {
    if (value.length <= maxLength) {
      setUserForm((prev) => ({ ...prev, [field]: value }));
      setUserFormError((prev) => ({ ...prev, [errorField]: null }));
      return;
    }
    setUserFormError((prev) => ({ ...prev, [errorField]: errorMessage }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const { emailErr, passwordErr, nameError } = validateForm(userForm);
    setUserFormError((prev) => ({
      ...prev,
      emailError: emailErr,
      passwordError: passwordErr,
      nameError,
    }));

    if (emailErr || passwordErr || nameError) return;
    try {
      const { ok, data } = await signUpRequest(userForm);

      if (!ok) {
        setUserFormError((prev) => ({
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
    userForm,
    userFormError,
    showPassword,
    setShowPassword,
    updateField,
    handleSignUp,
  };
};
