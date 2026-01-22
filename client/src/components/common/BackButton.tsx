import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mt-12 px-6 py-3 bg-cyan-500 text-black font-orbitron uppercase rounded-xl shadow-[0_0_10px_#0ff] hover:bg-cyan-400 transition"
      >
        ← Back
      </button>
    </div>
  );
};

export default BackButton;
