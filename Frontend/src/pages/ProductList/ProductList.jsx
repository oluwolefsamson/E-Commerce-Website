// src/components/ProductList.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../../components/CartContext"; // Import your CartContext
import NewProductModal from "../../components/NewProductModal.jsx";
import LogoutModal from "../../components/LogoutModal.jsx";
import cartImg from "../../assets/images/cart.png";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios

export default function ProductList() {
  const { addToCart, getTotalQuantity } = useCart(); // Use the context
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State for loading status

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-website1-4kwy.onrender.com/api/products"
      ); // Adjust the URL as necessary
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the function to fetch products when the component mounts
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-10 flex justify-between items-center p-4 bg-green-100">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
            aria-label="Search products"
          />
          <button className="hidden sm:block ml-2 bg-green-500 text-white rounded-lg px-4 py-2">
            Search
          </button>
        </div>
        <div className="flex items-center">
          <Link to="/cart" className="relative ml-4 flex items-center">
            <img src={cartImg} alt="Cart" className="h-8 w-8" />
            {getTotalQuantity() > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalQuantity()} {/* Show total quantity */}
              </span>
            )}
            <p class="hidden sm:block">Cart</p>
          </Link>
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="ml-4 bg-red-500 text-white rounded-lg px-4 py-2 text-base"
          >
            Logout
          </button>
        </div>
      </header>

      {loading ? ( // Display loading message while fetching
        <div className="text-center py-16">
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name} // Fallback to name if alt is not provided
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ₦{product.price}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    addToCart(product); // Add product to cart
                  }}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProduct && (
        <NewProductModal
          open={modalOpen}
          setOpen={setModalOpen}
          product={selectedProduct}
        />
      )}
      <LogoutModal
        open={logoutModalOpen}
        setOpen={setLogoutModalOpen}
        onLogout={() => {
          // Implement logout logic here
          console.log("User logged out");
          setLogoutModalOpen(false);
        }}
      />
    </div>
  );
}
