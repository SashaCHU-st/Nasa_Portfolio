import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserGroup,
  faArrowRightFromBracket,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { isAuthorized, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block w-full px-4 py-2 text-white font-orbitron uppercase rounded transition-colors duration-300 
    ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`;

  return (
    <div className="fixed top-0 left-0 w-full bg-black shadow-md min-h-24 flex items-center px-4 md:px-8 z-50">
      <div className="text-white text-2xl md:text-3xl font-orbitron uppercase flex-shrink-0 tracking-widest">
        Space Explorer
      </div>
      <div className="hidden md:flex h-full flex-1 ml-8">
        <NavLink to="/home" className={linkClasses}>
          HOME
        </NavLink>
        <NavLink to="/users" className={linkClasses}>
          USERS
        </NavLink>
        {isAuthorized && (
          <NavLink to="/favorites" className={linkClasses}>
            FAVORITES
          </NavLink>
        )}
        <NavLink to="/search" className={linkClasses}>
          SEARCH
        </NavLink>
      </div>
      <div className="hidden md:flex ml-auto gap-2">
        {!isAuthorized && (
          <NavLink to="/auth" className={linkClasses}>
            <FontAwesomeIcon icon={faUser} className="text-xl md:text-2xl" />
          </NavLink>
        )}
        {isAuthorized && (
          <>
            <NavLink to="/myProfile" className={linkClasses}>
              <FontAwesomeIcon icon={faUser} className="text-xl md:text-2xl" />
            </NavLink>
            <NavLink to="/subscribtions" className={linkClasses}>
              <FontAwesomeIcon icon={faUserGroup} className="text-xl md:text-2xl" />
            </NavLink>
            <NavLink onClick={logout} to="/home" className={linkClasses}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-xl md:text-2xl"
              />
            </NavLink>
          </>
        )}
      </div>
      <div className="md:hidden ml-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-white text-2xl focus:outline-none"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>
      <div
        className={`absolute top-24 left-0 w-full bg-black flex flex-col items-start p-4 md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <NavLink to="/home" className={linkClasses} onClick={() => setIsOpen(false)}>
          HOME
        </NavLink>
        <NavLink to="/users" className={linkClasses} onClick={() => setIsOpen(false)}>
          USERS
        </NavLink>
        {isAuthorized && (
          <NavLink to="/favorites" className={linkClasses} onClick={() => setIsOpen(false)}>
            FAVORITES
          </NavLink>
        )}
        <NavLink to="/search" className={linkClasses} onClick={() => setIsOpen(false)}>
          SEARCH
        </NavLink>

        {!isAuthorized && (
          <NavLink to="/auth" className={linkClasses} onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faUser} className="text-xl mr-2" /> LOGIN
          </NavLink>
        )}
        {isAuthorized && (
          <>
            <NavLink to="/subscribtions" className={linkClasses} onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faUserGroup} className="text-xl mr-2" /> Subscriptions
            </NavLink>
            <NavLink to="/myProfile" className={linkClasses} onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faUser} className="text-xl mr-2" /> PROFILE
            </NavLink>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="cursor-pointer w-full text-left px-4 py-2 text-white font-orbitron uppercase hover:bg-gray-800 rounded"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
              LOGOUT
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
