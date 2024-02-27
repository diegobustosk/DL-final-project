import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../../context/cartContext";


function BurguerMenu({ toggleOpen }) {
  const { user } = useContext(userContext);
  const { cart } = useCart();
  
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

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
          <Link className="p-4" onClick={handleLogout}>Logout</Link>
          <Link className="flex justify-center items-center p-4 hover:underline hover:text-lg hover:duration-300 cursor-pointer" to="/user/favorites"> 
            <FaHeart className='fill-rose-400' size={20}/>
          </Link>
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

    
<div className="flex justify-center items-center p-4">
    <Link to="/cart" className="relative fill-white hover:fill-sky-400">
        <FaShoppingCart size={25} />
        {cartQuantity > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartQuantity}
            </span>
        )}
    </Link>
</div>
    </div>
  );
}

export default BurguerMenu;