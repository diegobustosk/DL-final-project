import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { useCart } from "../../context/cartContext";
import { FaShoppingCart } from "react-icons/fa";

function Navbar({ toggleOpen }) {
  const { user, setUser } = useContext(userContext);
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();



  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate('/user');
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
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

      <div className="pr-8 hidden md:flex items-center">
    {user ? (
      <>
        <span onClick={navigateToProfile} className="p-4 text-gray-400 cursor-pointer">
          {user.user_name}
        </span>
        <Link className="p-4" onClick={handleLogout}>Logout</Link>
        {user.user_role === 'admin' && (
          <Link className="p-4 text-white hover:underline hover:text-lg hover:duration-300 cursor-pointer" to="/admin/createproduct">Create Product</Link>
        )}
      </>
    ) : (
      <>
        <Link className="p-4 hover:underline hover:text-lg hover:duration-300 cursor-pointer" to="/login">Login</Link>
        <Link className="p-4 hover:underline hover:text-lg hover:duration-300 cursor-pointer" to="/register">Register</Link>
      </>
    )}

    <Link to="/cart" className="relative fill-white hover:fill-sky-400 ml-4">
      <FaShoppingCart size={25} />
      {cartQuantity > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {cartQuantity}
        </span>
      )}
    </Link>
  </div>

      
    </nav>
  );
}

export default Navbar;
