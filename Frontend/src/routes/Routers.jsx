import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ProductList from "../pages/ProductList/ProductList";
import CartPage from "../pages/CartPage/CartPage";
import { CartProvider } from "../components/CartContext";
import AddProduct from "../pages/Admin/AddProduct";
import DeleteProduct from "../pages/Admin/DeleteProduct";

const Routers = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/deleteproduct" element={<DeleteProduct />} />
        {/* Ensure this is the exact path */}
      </Routes>
    </CartProvider>
  );
};

export default Routers;
