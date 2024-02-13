import React from "react";
import { Link } from "react-router-dom";

function BurguerMenu({ toggleOpen }) {
  return (
    <div
      className="grid grid-rows-3 text-center bg-black md:hidden"
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
