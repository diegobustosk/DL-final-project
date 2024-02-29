import React, { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
import { useLocation } from "react-router-dom";
const  {VITE_APP_URL} = import.meta.env

function Products() {
  // Estados existentes
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Nuevo estado para manejar las categorías
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryIdFromQuery = queryParams.get("category");
  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState(categoryIdFromQuery || "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${VITE_APP_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl = `${VITE_APP_URL}/products`;
      const url = selectedCategory ? `${baseUrl}/category/${selectedCategory}` : baseUrl;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full p-2 border rounded mb-4 text-black"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Selector de categorías */}
      <select
        className="w-full p-2 border rounded mb-4 text-black bg-white appearance-none"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option className="text-black"  value="">Todas las categorías</option>
        {categories.map((category) => (
          <option className="text-black" key={category.category_id} value={category.category_id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.filter((product) => product.product_name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 flex flex-col items-center cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.primary_img_url}
              alt={product.product_name}
              className="w-full h-48 object-cover mb-2"
            />
            <h5 className="text-lg font-bold text-black">{product.product_name}</h5>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

export default Products;