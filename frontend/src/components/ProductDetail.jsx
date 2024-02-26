import React, { useState, useContext } from "react";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import userContext from "../context/userContext";


function ProductDetail({ product, onClose }) {
  if (!product) return null;
  const { user } = useContext(userContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    alert('Added to cart');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-3xl w-3/4 h-3/4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-700">{product.product_name}</h2>
          <button className="text-red-400 text-5xl" onClick={onClose}>×</button>
        </div>
        <img
          src={product.primary_img_url}
          alt={product.product_name}
          className="w-full h-96 object-cover mt-4"
        />
        <div className="flex justify-between">
          <div>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-900 font-bold">${product.price}</p>
            <p className="text-gray-500">Stock: {product.stock}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
          {user && <button className={` m-1`} onClick={handleFavoriteClick}>
            <FaHeart className={`${isFavorite ? 'fill-rose-400' : 'fill-gray-500'}`} size={20}/>
            </button>}
          <button className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 flex items-center mt-1" onClick={handleAddToCart}>
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;