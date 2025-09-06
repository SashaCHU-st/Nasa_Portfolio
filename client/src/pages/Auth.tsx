import Mars from "../backgrounds/Mars";
import AuthComponent from "../components/AuthComponent";

const Auth = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Mars />
      <div className="absolute top-1/2 sm:left-[40%] -translate-x-1/4 -translate-y-1/2 w-11/12 max-w-[80%] px-4">

        <AuthComponent/>
      </div>
    </div>
  );
};

export default Auth;
