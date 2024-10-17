import React from "react";
import { useCart } from "./CartContext"; // Import useCart

const NewProductModal = ({ open, setOpen, product }) => {
  const { addToCart } = useCart(); // Access the addToCart function

  if (!open) return null; // Don't render if not open

  const handleAddToCart = () => {
    addToCart(product); // Add the product to the cart
    setOpen(false); // Optionally close the modal after adding
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 w-10/12 max-w-[300px] sm:max-w-xs md:max-w-sm mx-auto overflow-y-auto max-h-[85vh] shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-center text-gray-800 mb-2">
          Product Name: {product.name}
        </h2>
        <div className="flex justify-center mt-2">
          {/* Center the image */}
          <img
            src={product.image}
            alt={product.imageAlt}
            className="object-cover rounded-lg border-2 border-gray-200 shadow-sm"
            style={{ height: "150px", width: "150px" }} // Reduced image size
          />
        </div>
        <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">
          Description: {product.description}
        </p>
        <p className="font-bold mt-2 text-sm sm:text-lg text-blue-600">
          Price: ₦{product.price}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-500 text-white rounded-lg px-4 py-2 sm:py-3 hover:bg-green-600 transition duration-200 text-sm shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex-1 bg-gray-300 text-gray-700 rounded-lg px-4 py-2 sm:py-3 hover:bg-gray-400 transition duration-200 text-sm shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProductModal;
