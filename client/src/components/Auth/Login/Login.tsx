import AuthTitle from "../ui/AuthTitle";
import AuthButton from "../ui/AuthButton";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { useLogin } from "./hooks/useLogin";

const Login = () => {
  const {
    userFormLogin,
    userFormErrorLogin,
    showPassword,
    setShowPassword,
    updateFieldLogin,
    handleLogin,
  } = useLogin();
  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <AuthTitle>Welcome Back</AuthTitle>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center w-full"
      >
        <EmailInput
          value={userFormLogin.email}
          error={userFormErrorLogin.emailError}
          updateField={updateFieldLogin}
        />
        <PasswordInput
          value={userFormLogin.password}
          error={userFormErrorLogin.passwordError}
          updateField={updateFieldLogin}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <AuthButton>Login</AuthButton>
      </form>
    </div>
  );
};

export default Login;
