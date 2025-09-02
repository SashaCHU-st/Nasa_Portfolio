import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { isAuthorized, logout } = useAuth();
  return (
    <div className="fixed top-0 left-0 w-full bg-black shadow-md h-24 flex items-center px-4 md:px-8 z-50">
      <div className="text-white text-2xl md:text-3xl font-orbitron uppercase flex-shrink-0 tracking-widest">
        Space Explorer
      </div>
      <div className="flex h-full flex-1 ml-8">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex-1 h-full flex items-center justify-center text-white font-orbitron uppercase rounded transition-colors duration-300
         ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex-1 h-full flex items-center justify-center text-white font-orbitron uppercase rounded transition-colors duration-300
      ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          USERS
        </NavLink>
        {isAuthorized && (
          <>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex-1 h-full flex items-center justify-center text-white font-orbitron uppercase rounded transition-colors duration-300
      ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
              }
            >
              FAVORITES
            </NavLink>
          </>
        )}
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex-1 h-full flex items-center justify-center text-white font-orbitron uppercase rounded transition-colors duration-300
      ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          SEARCH
        </NavLink>
      </div>
      <div className="ml-auto w-16 h-full text-white font-orbitron uppercase hover:bg-gray-700 rounded flex items-center justify-center transition-colors duration-300">
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `flex-1 h-full flex items-center justify-center text-white font-orbitron uppercase rounded transition-colors duration-300
      ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          <FontAwesomeIcon icon={faUser} className="text-xl md:text-2xl" />
        </NavLink>
      </div>
      {isAuthorized && (
        <div className="ml-auto w-16 h-full text-white font-orbitron uppercase hover:bg-gray-700 rounded flex items-center justify-center transition-colors duration-300">
          <NavLink
          onClick={logout}
            to="/home"
            className={({ isActive }) =>
              `flex-1 h-full flex items-center justify-center text-white font-orbitron uppercase rounded transition-colors duration-300
      ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
            }
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-xl md:text-2xl"
            />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
