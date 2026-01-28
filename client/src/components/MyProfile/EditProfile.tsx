import { useState } from "react";
const cosmon = "/avatar/cosmon.png";
import { useEffect } from "react";
import { validateName, validatePassword } from "../../utils/InputValidation";

const BACK_API = import.meta.env.VITE_BACKEND_API;

const EditProfile = () => {
  const [name, setName] = useState<string>("");
  const [oldName, setOldName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [profileUpdatedMessage, setProfileUpdatedMessage] =
    useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  // const [error, setError] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileUpdatedMessage("");
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
        setImage(data.user.image);
        setOldName(data.user.name);
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };

    checkAuth();
  }, []);

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordErr = validatePassword(password);
    const nameError = validateName(name);
    if (passwordErr === "" || nameError === "") {
      setErrorPassword(passwordErr);
      setErrorName(nameError);
    }
    try {
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
      if (name !== "" && image !== "") {
        setName(data.user.name);
        setImage(data.user.image);
      }
      // console.log("data=>", data.message);
      setProfileUpdatedMessage(data.message);
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error", err.message);
        // setError(err.message || "Something went wrong");
      } else {
        console.error("Unexpected error", err);
        // setError("Something went wrong");
      }
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
          {imageBase64 ? (
            <img
              src={imageBase64}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
            />
          ) : (
            <img
              src={image ? image : cosmon}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
            />
          )}
          <div className="w-full flex justify-center items-center my-4">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="fileInput"
              className="font-orbitron uppercase w-full rounded-2xl p-4
               bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center cursor-pointer"
            >
              Upload Image
            </label>
          </div>
          <div className="relative w-96 my-8">
            {errorName ? (
              <h2
                className="font-orbitron uppercase text-l sm:text-l md:text-l font-bold text-red-600 tracking-widest
                    text-center"
              >
                {errorName}
              </h2>
            ) : null}
            <input
              className="font-orbitron uppercase border-4 border-gray-500 rounded my-8 p-4 w-96 text-gray-200"
              type="text"
              placeholder={oldName}
              value={name}
              onChange={(e) => {
                setProfileUpdatedMessage("");
                const value = e.target.value;
                // clear previous error while user types
                if (errorName) setErrorName(null);
                if (value.length <= 20) {
                  setName(value);
                } else {
                  setErrorName("Name must be max 20 characters");
                }
              }}
            />
          </div>

          <div className="relative w-96 my-8">
            {errorPassword ? (
              <h2
                className="font-orbitron uppercase text-l sm:text-l md:text-l font-bold text-red-600 tracking-widest
                    text-center"
              >
                {errorPassword}
              </h2>
            ) : null}
            <input
              className="font-orbitron uppercase border-4 border-gray-500 rounded p-4 w-full text-gray-200"
              type={showPassword ? "text" : "password"}
              placeholder="Please write your new password"
              value={password}
              onChange={(e) => {
                setProfileUpdatedMessage("");
                const value = e.target.value;
                // clear previous error while user types
                if (errorPassword) setErrorPassword(null);
                if (value.length <= 40) {
                  setPassword(value);
                } else {
                  setErrorPassword("Password must be max 40 characters");
                }
              }}
            />
            <button
              type="button"
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {profileUpdatedMessage ? (
            <h3 className="font-orbitron uppercase text-white p-2">
              {profileUpdatedMessage}
            </h3>
          ) : null}
          <button
            type="submit"
            className=" cursor-pointer font-orbitron uppercase w-52 rounded-2xl p-4
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
