import React, { useState } from "react";

function ProductDetail({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-700">{product.name}</h2>
          <button className="text-red-400" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full object-cover h-64"
        />
        <p className="text-gray-700 mt-4">{product.description}</p>
        <p className="text-gray-900 font-bold">${product.price}</p>
        {/* Aquí puedes agregar más detalles del producto */}
      </div>
    </div>
  );
}

export default ProductDetail;
