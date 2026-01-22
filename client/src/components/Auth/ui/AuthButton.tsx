import { type ReactNode } from "react";

interface AuthButtonProps {
  children: ReactNode;
}

const AuthButton = ({ children }: AuthButtonProps) => {
  return (
    <button
      type="submit"
      className="cursor-pointer font-orbitron uppercase w-32 rounded-2xl p-4
                        bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
    >
      {children}
    </button>
  );
};

export default AuthButton;
