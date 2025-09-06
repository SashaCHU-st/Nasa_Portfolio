import { useState } from "react";
import cosmon from "../../public/avatar/cosmon.png";
import { useEffect } from "react";

const BACK_API = import.meta.env.VITE_BACKEND_API;

const EditProfile = () => {
  const [name, setName] = useState<string>("");
  const [oldName, setOldName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${BACK_API}/me`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log("HHH=>", data.user.image);
        setImage(data.user.image)
        setOldName(data.user.name)
        console.log(data.user.image)

      } catch (err) {
        console.error("Auth check failed", err);
      }
    };

    checkAuth();
  }, []);

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${BACK_API}/editProfile`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        image: imageBase64,
        password,
        name,
      }),
    });
    const data = await res.json();
    console.log("DATAaaa=>", data);

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="relative flex flex-col items-center justify-between rounded-2xl p-6 
        bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff]"
      >
        <h2
          className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
          [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
        >
          Edit Profile
        </h2>

        <form
          onSubmit={handleEditProfile}
          className="flex flex-col items-center w-full"
        >
          {image ? (
            <img
              src={image}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
            />
          ) : (
            <img
              src={cosmon}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="my-4 text-gray-200"
          />
          <input
            className="font-orbitron uppercase border-4 border-gray-500 rounded my-8 p-4 w-96 text-gray-200"
            type="text"
            placeholder={oldName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="relative w-96 my-8">
            <input
              className="font-orbitron uppercase border-4 border-gray-500 rounded p-4 w-full text-gray-200"
              type={showPassword ? "text" : "password"}
              placeholder="Please write your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            type="submit"
            className="font-orbitron uppercase w-52 rounded-2xl p-4
              bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          >
            Change Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
