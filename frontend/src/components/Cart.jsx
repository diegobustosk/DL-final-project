import React, { useContext, useEffect } from "react";
import cartContext from "../context/cartContext";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(cartContext);
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId, delta) => {
    const updatedCart = cart.map(item => {
      if (item.product_id === productId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        item.quantity = newQuantity
        return item ;
      }
      return item;
    }).filter(item => item.quantity > 0)
    setCart([]);
    console.log(updatedCart)
    console.log(cart);
    // navigate('/cart')
  };

  return (
    <div className="container mx-auto p-4">
      {cart.map(product => (
        <div key={product.product_id} className="flex items-center justify-between p-4 border-b">
          <img src={product.primary_img_url} alt={product.product_name} className="w-20 h-20 object-cover" />
          <div>
            <p  className="text-black">{product.product_name}</p>
            <p className="text-black">${product.price}</p>
          </div>
          <div>
            <button  onClick={() => handleQuantityChange(product.product_id, -1)}>
              <FaMinus className="fill-rose-400" size={15}/>
            </button>
            <span className="mx-2 text-black">{product.quantity}</span>
            <button onClick={() => handleQuantityChange(product.product_id, 1)}>
              <FaPlus className="fill-green-400" size={15}/>
            </button>
          </div>
          <p className="text-black">${(product.price * product.quantity).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
