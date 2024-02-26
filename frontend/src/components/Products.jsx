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
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al cargar productos");
        }
      } catch (error) {
        console.error("Error en el servidor", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
              src={product.primary_img_url}
              alt={product.product_name }
              className="w-full h-48 object-cover mb-2"
            />
            <h5 className="text-lg font-bold  text-black">{product.product_name}</h5>
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
