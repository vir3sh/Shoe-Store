import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCartCount = async () => {
      const count = await getCartCount();
      setCartCount(count);
    };
    fetchCartCount();
  }, [getCartCount]);

  return (
    <>
      <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-5 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            LOGO
          </Link>

          {/* Desktop Navigation & Icons */}
          <div className="hidden md:flex items-center gap-8 text-lg">
            <Link to="/home" className="hover:text-gray-400">
              HOME
            </Link>
            <Link to="/collection" className="hover:text-gray-400">
              COLLECTION
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              CONTACT
            </Link>
            <Link to="/account" className="text-xl hover:text-gray-400">
              <FaUser />
            </Link>
            <Link to="/cart" className="relative text-xl hover:text-gray-400">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-black text-white flex flex-col items-center justify-center gap-6 text-xl transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-5 right-5 text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            HOME
          </Link>
          <Link to="/collection" onClick={() => setMenuOpen(false)}>
            COLLECTION
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            CONTACT
          </Link>
          <Link
            to="/account"
            className="text-xl hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser />
          </Link>
          <Link
            to="/cart"
            className="relative text-xl hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
      <div className="mt-20"></div>
    </>
  );
};

export default Navbar;
