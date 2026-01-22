import { useState } from "react";
import Switcher from "./Switcher";
import RequiredFields from "./RequiredFields";

const AuthComponent = () => {
  const [switcher, setSwitcher] = useState(false);
  return (
    <div className="flex justify-start items-center min-h-screen">
      <div
        className="relative flex flex-col items-center justify-start rounded-2xl p-6 
                 bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff]"
      >
        <Switcher switcher={switcher} setSwitcher={setSwitcher} />
        <RequiredFields />
      </div>
    </div>
  );
};

export default AuthComponent;
