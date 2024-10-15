// src/components/NewProductModal.jsx

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-11/12 max-w-md mx-auto">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-full h-auto rounded mt-2"
        />
        <p className="mt-2">{product.description}</p>
        <p className="font-bold mt-2 text-lg">{product.price}</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-600 transition duration-200"
          >
            Add to Cart
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex-1 bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProductModal;
