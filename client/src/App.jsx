import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ProductSingle from "./pages/ProductSingle";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Collection />} path="/collection" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<ProductSingle />} path="/product/:id" />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
