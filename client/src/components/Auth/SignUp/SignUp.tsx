import { MAX_PASSWORD_LENGTH } from "../model/limits";
import { useSignUp } from "./hooks/useSignUp";
import AuthTitle from "../ui/AuthTitle";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import AuthButton from "../ui/AuthButton";

const SignUp = () => {
  const {
    userForm,
    userFormError,
    showPassword,
    setShowPassword,
    updateField,
    handleSignUp,
  } = useSignUp();
  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <AuthTitle>Register</AuthTitle>
      </div>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col items-center w-full"
      >
        <NameInput
          value={userForm.name}
          error={userFormError.nameError}
          updateField={updateField}
        />
        <EmailInput
          value={userForm.email}
          error={userFormError.emailError}
          updateField={updateField}
        />
        <PasswordInput
          value={userForm.password}
          error={userFormError.passwordError}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChange={(value) =>
            updateField(
              "password",
              "passwordError",
              value,
              MAX_PASSWORD_LENGTH,
              "Password must be max 40 characters",
            )
          }
        />
        <AuthButton>Sign Up</AuthButton>
      </form>
    </div>
  );
};

export default SignUp;
