import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import SwitchButton from "./ui/SwitchButton";

interface SwitcherProps {
  switcher: boolean;
  setSwitcher: (value: boolean) => void;
}

const Switcher = ({ switcher, setSwitcher }: SwitcherProps) => {
  return (
    <div>
      {switcher ? (
        <>
          <SignUp />
          <SwitchButton setSwitcher={() => setSwitcher(false)}>
            Have an account? Login
          </SwitchButton>
        </>
      ) : (
        <>
          <Login />
          <SwitchButton setSwitcher={() => setSwitcher(true)}>
            Don't have account Register
          </SwitchButton>
        </>
      )}
    </div>
  );
};

export default Switcher;
