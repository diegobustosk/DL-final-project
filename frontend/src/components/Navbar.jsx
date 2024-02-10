import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
