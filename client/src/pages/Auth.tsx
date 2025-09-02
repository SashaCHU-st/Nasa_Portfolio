import Mars from "../backgrounds/Mars";
import AuthComponent from "../components/AuthComponent";

const Auth = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Mars />
      <div className="absolute top-2/5 right-[50%] transform -translate-y-1/2 w-11/12 md:w-[36rem] lg:w-[44rem] xl:w-[52rem] max-w-[90vw]">
        <AuthComponent/>
      </div>
    </div>
  );
};

export default Auth;
