import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Navbar({ toggleOpen }) {
  return (
    <nav className="bg-black w-full flex justify-between items-center h-16 text-white realtive shadow-sm">
      <Link className="px-24 md:px-16 sm:px-8" to="/">
        <img
          src="../../public/logo.png"
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
        <Link className="p-4" to="/">
          Home
        </Link>
        <Link className="p-4" to="/products">
          Products
        </Link>
        <Link className="p-4" to="/contact">
          Contact
        </Link>
      </div>
      <div className=" pr-8 hidden  md:block">
        <Link className="p-4" to="/login">
          Login
        </Link>
        <Link className="p-4" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
