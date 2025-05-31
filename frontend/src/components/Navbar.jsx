import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/logo.png';

const Nav = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
  };

  const imguri = `http://localhost:8000/api/uploads/${user?.avatar}`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/20 border-b border-white/30 shadow-lg px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-3 group mb-2 sm:mb-0">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 rounded-full shadow-md transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-2xl font-bold text-white drop-shadow-sm group-hover:text-blue-200 transition">
          StudyBuddy
        </span>
      </Link> 

      {/* Center: Heading */}
      {/* <div className="flex-1 flex justify-center mb-2 sm:mb-0">
        <h3 className="text-sm sm:text-lg font-semibold text-white bg-blue-600/50 px-3 py-1 rounded-full shadow hover:bg-blue-700/60 transition">
          
        </h3>
      </div> */}

      {/* Right: Links */}
      <div className="flex items-center space-x-3 sm:space-x-5 text-sm sm:text-base">
        {user ? (
          <>
            <Link to="/profile" title="Profile">
              <img
                src={imguri || "/avatar.png"}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-400 shadow"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-200 hover:text-red-400 font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/register"
            className="text-blue-100 hover:text-blue-300 font-medium transition"
          >
            Join Now
          </Link>
        )}
        <Link
          to="/about"
          className="text-white hover:text-blue-200 transition"
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
