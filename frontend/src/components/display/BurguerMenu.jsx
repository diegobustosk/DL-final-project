import React from "react";
import { Link } from "react-router-dom";

function BurguerMenu({ toggleOpen }) {
  return (
    <div
      className="absolute right-0 top-16 grid grid-rows-3 text-center bg-black w-3/4 sm:w-1/2 md:w-1/ md:hidden z-10"
      onClick={toggleOpen}
    >
      <Link className="p-4" to="/">
        Home
      </Link>
      <Link className="p-4" to="/products">
        Products
      </Link>
      <Link className="p-4" to="/contact">
        Contact
      </Link>
      <Link className="p-4" to="/login">
        Login
      </Link>
      <Link className="p-4" to="/register">
        Register
      </Link>
    </div>
  );
}

export default BurguerMenu;
