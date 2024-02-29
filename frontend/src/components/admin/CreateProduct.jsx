
import React, { useState, useContext} from "react";
import userContext from "../../context/userContext";
const  {VITE_APP_URL} = import.meta.env


function CreateProduct() {

  
  const { user, setUser } = useContext(userContext);
  
  
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    primary_img_url: ""
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for empty fields
    if (!productData.productName || !productData.description || !productData.price || !productData.stock || !productData.categoryId || !productData.primary_img_url) {
      setError("Please fill in all fields");
      return;
    }
  
    try {
      const response = await fetch(`${VITE_APP_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}` 
        },
        body: JSON.stringify(productData)
      });
      const data = await response.json();

      if (response.status === 201) {
        setProductData({
          productName: "",
          description: "",
          price: "",
          stock: "",
          categoryId: "",
          primary_img_url: ""
        });
        setError("");
        alert(`Product created successfully! Product ID: ${data.product_id}`);
      } else {
        setError("Failed to create product. " + (data.message || ""));
      }
    } catch (error) {
      setError("Server Error");
      console.error(error.message);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Create a New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={productData.productName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 text-black rounded focus:outline-none focus:border-gray-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:border-gray-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded  text-black focus:outline-none focus:border-gray-500"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productData.stock}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:border-gray-500"
          />
          <input
            type="number"
            name="categoryId"
            placeholder="Category ID"
            value={productData.categoryId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:border-gray-500"
          />
          <input
            type="text"
            name="primary_img_url"
            placeholder="Primary Image URL"
            value={productData.primary_img_url}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          >
            Create Product
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;