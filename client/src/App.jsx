import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ProductSingle from "./pages/ProductSingle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Collection />} path="/collection" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Login />} path="/login" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<ProductSingle />} path="/product/:id" />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
