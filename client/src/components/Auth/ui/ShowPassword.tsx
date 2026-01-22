interface ShowPasswordProps {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}
const ShowPassword = ({ showPassword, setShowPassword }: ShowPasswordProps) => {
  return (
    <button
      type="button"
      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "🙈" : "👁️"}
    </button>
  );
};

export default ShowPassword;
