import React, { useContext, useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const { cart, updateProductQuantity  } = useCart();

  const handleQuantityChange = (productId, delta) => {
    updateProductQuantity(productId, delta);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center justify-center h-5/6">
      <h1 className="text-4xl font-bold mt-5 mb-10 text-black">Your Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="container mx-auto p-4 w-5/6">
          {cart.map((product) => (
            <div key={product.product_id} className="flex items-center justify-between p-4 border-b">
              <img src={product.primary_img_url} alt={product.product_name} className="w-20 h-20 object-cover" />
              <div>
                <p className="text-black">{product.product_name}</p>
                <p className="text-black">${product.price}</p>
              </div>
              <div>
                <button onClick={() => handleQuantityChange(product.product_id, -1)} className="p-1">
                  <FaMinus className="fill-rose-400" size={15} />
                </button>
                <span className="mx-2 text-black">{product.quantity}</span>
                <button onClick={() => handleQuantityChange(product.product_id, 1)} className="p-1">
                  <FaPlus className="fill-green-400" size={15} />
                </button>
              </div>
              <p className="text-black">${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-2xl">
              Total: <span className="font-bold">${total.toFixed(2)}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <FaShoppingCart size={50} className="mx-auto fill-gray-400" />
          <p className="text-xl mt-5 text-black">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
