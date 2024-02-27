import React from "react";
import { useFavorites } from "../../context/favoritesContext";
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="flex flex-col items-center justify-center h-5/6">
      <h1 className="text-4xl font-bold mt-5 mb-10 text-black">Your Favorites</h1>
      {favorites.length > 0 ? (
        <div className="container mx-auto p-4 w-5/6">
          {favorites.map((product) => (
            <div key={product.product_id} className="flex items-center justify-between p-4 border-b">
              <img src={product.primary_img_url} alt={product.product_name} className="w-20 h-20 object-cover" />
              <div>
                <p className="text-black">{product.product_name}</p>
                <p className="text-black">${product.price}</p>
              </div>
              <button onClick={() => removeFavorite(product.product_id)} className="p-1">
                <FaHeart className="fill-red-500 " size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <FaHeartBroken size={50} className="mx-auto fill-gray-400" />
          <p className="text-xl mt-5 text-black">You have no favorite items</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;