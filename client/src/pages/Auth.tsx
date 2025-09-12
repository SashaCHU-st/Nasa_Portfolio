import Mars from "../backgrounds/Mars";
import AuthComponent from "../components/AuthComponent";

const Auth = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Mars />

      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-6/12 sm:max-w-[95%] px-4">
        <AuthComponent />
      </div>
    </div>
  );
};

export default Auth;
