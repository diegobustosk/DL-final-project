import React, { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Camiseta Blanca",
        price: 19.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 2,
        name: "Pantalón Denim",
        price: 39.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 3,
        name: "Gorra de Béisbol",
        price: 14.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 4,
        name: "Sudadera Gris",
        price: 29.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 5,
        name: "Zapatillas Deportivas",
        price: 49.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 6,
        name: "Bolso de Mano",
        price: 24.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 7,
        name: "Reloj Elegante",
        price: 59.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 8,
        name: "Cinturón de Cuero",
        price: 15.99,
        imageUrl:
          "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ]);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full p-2 border rounded mb-4 text-black"
        value={searchTerm}
        onChange={handleSearch}
      />

      <select className="w-full p-2 border rounded mb-4 text-black bg-white appearance-none">
        {["poleras", "shorts", "toallas", "pantalones", "polerones"].map(
          (category, index) => (
            <option
              key={index}
              value={category}
              className="bg-white text-black"
            >
              {category}
            </option>
          )
        )}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 flex flex-col items-center"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h5 className="text-lg font-bold">{product.name}</h5>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default Products;
