import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";

function Navbar({ toggleOpen }) {

  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();



  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate('/user');
  };

  return (
    <nav className="bg-black w-full flex justify-between items-center h-16 text-white realtive shadow-sm">
      <Link className="px-24 md:px-16 sm:px-8" to="/">
        <img
          src="../../logo.png"
          alt="Logo"
          className=" h-16 w-16 rounded-full"
        />
      </Link>

      <div className="px-4 cursor-pointer md:hidden" onClick={toggleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      <div className=" pr-8 hidden  md:block">
        <Link className="p-4|
          hover:underline 
          hover:text-lg 
          hover:duration-300 
          cursor-pointer" to="/">
          Home
        </Link>
        <Link className="p-4
        hover:underline 
        hover:text-lg 
        hover:duration-300 
        cursor-pointer" to="/products">
          Products
        </Link>
      </div>
      <div className=" pr-8 hidden  md:block">
        {user ? (
          <>
            <span onClick={navigateToProfile} className="p-4 text-gray-400 cursor-pointer">
              {user.user_name}
            </span>
            <Link className="p-4" onClick={handleLogout}>Logout</Link>


            {user.user_role === 'admin' && (
              <Link className="p-4 text-white
                    hover:underline 
                hover:text-lg 
                hover:duration-300 
                cursor-pointer" to="/admin/createproduct">Create Product</Link>
                  )}
                </>        
        ) : (
          <>
            <Link className="p-4 hover:underline 
          hover:text-lg 
          hover:duration-300 
          cursor-pointer" to="/login">Login</Link>
            <Link className="p-4 hover:underline 
          hover:text-lg 
          hover:duration-300 
          cursor-pointer" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
