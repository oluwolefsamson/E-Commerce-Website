import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader";
const apiUrl = import.meta.env.VITE_API_URL;
const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token"); // Ensure this is the correct way you store your token

        await axios.delete(`${apiUrl}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        // Update state to remove the deleted product
        setProducts((prev) => prev.filter((product) => product._id !== id));
      } catch (error) {
        console.error(
          "Error deleting product:",
          error.response ? error.response.data : error
        );
      }
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <AdminHeader />
      <input
        type="text"
        placeholder="Search products..."
        className="mb-8 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-sky-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-cover bg-center bg-no-repeat h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
              style={{
                backgroundImage: `url(${product.image || "defaultImageUrl"})`,
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 rounded-lg z-0"></div>

              {/* Content inside card */}
              <div className="absolute bottom-0 p-4 text-white z-10">
                <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                <p className="text-sm text-gray-300 mb-4">
                  {product.description}
                </p>

                {/* Ensure button is on top */}
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors w-full relative z-20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-gray-600 text-center">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteProduct;
