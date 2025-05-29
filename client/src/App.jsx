import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ProductSingle from "./pages/ProductSingle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

const App = () => {
  const { loggedin } = useContext(ShopContext);

  if (loggedin === null) {
    return <div>Loading...</div>; // Show a loading screen while checking login
  }

  return (
    <div>
      <ToastContainer />
      <Navbar  />

      <Routes>
        {/* Public Routes */}
        <Route element={<Home />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Orders />} path="/orders" />
        <Route element={<PlaceOrder />} path="/place-order" />
        <Route element={<ProductSingle />} path="/product/:id" />

        {/* Protected Routes (Require Login) */}
        <Route
          path="/collection"
          element={loggedin ? <Collection /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cart"
          element={loggedin ? <Cart /> : <Navigate to="/login" replace />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
