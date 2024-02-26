import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";

function BurguerMenu({ toggleOpen }) {
  const { user } = useContext(userContext);

  return (
    <div
      className="absolute right-0 top-16 grid grid-rows-3 text-center bg-black w-3/4 sm:w-1/2 md:w-1/4 md:hidden z-10"
      onClick={toggleOpen}
    >
      <Link className="p-4" to="/">Home</Link>
      <Link className="p-4" to="/products">Products</Link>
      <Link className="p-4" to="/contact">Contact</Link>

      {user ? (
        <>
          <Link className="p-4" onClick={() => {/* logout logic here */}}>Logout</Link>
          {user.user_role === 'admin' && (
            <Link className="p-4" to="/admin/createproduct">Create Product</Link>
          )}
        </>
      ) : (
        <>
          <Link className="p-4" to="/login">Login</Link>
          <Link className="p-4" to="/register">Register</Link>
        </>
      )}
    </div>
  );
}

export default BurguerMenu;