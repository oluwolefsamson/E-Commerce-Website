// src/components/AdminHeader.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="w-full  p-4  mb-6">
      <nav className="flex justify-center  items-center space-x-4">
        <Link
          to="/addproduct"
          className="text-gray-400 font-black lg:text-lg sm:text-xs hover:text-gray-700"
        >
          Add Product
        </Link>
        <Link
          to="/deleteproduct"
          className="text-gray-400 font-black lg:text-lg sm:text-xs hover:text-gray-700"
        >
          Delete Product
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
