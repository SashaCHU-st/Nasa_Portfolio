import type { ReactNode } from "react";

interface SwitchButtonProps {
  children: ReactNode;
  setSwitcher: (value:boolean) => void;
}
const SwitchButton = ({ children, setSwitcher }: SwitchButtonProps) => {
  return (
    <button
      className="cursor-pointer font-sans text-white text-center underline py-8"
      onClick={() => setSwitcher(true)}
    >
      {children}
    </button>
  );
};

export default SwitchButton;
