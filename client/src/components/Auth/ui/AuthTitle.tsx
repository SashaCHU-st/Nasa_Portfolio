import  { type ReactNode } from "react";

interface AuthTitleProps {
  children: ReactNode;
}

const AuthTitle = ({ children }: AuthTitleProps) => {
  return (
    <h2
      className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
                 [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
    >
      {children}
    </h2>
  );
};

export default AuthTitle;
