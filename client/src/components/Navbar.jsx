import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { getCartCount, loggedin } = useContext(ShopContext);
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
    <div className="bg-black">
      <div className="flex justify-between items-center mx-3 p-2 bg-black text-teal-50 py-5">
        {/* Logo */}
        <div className="logo text-xl font-bold">LOGO</div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          {menuOpen ? (
            <FaTimes
              className="text-white text-2xl"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="text-white text-2xl"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex flex-col md:flex-row gap-5 text-xl p-5 md:p-0 transition-all duration-300 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            HOME
          </Link>
          <Link to="/collection" onClick={() => setMenuOpen(false)}>
            COLLECTION
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            CONTACT
          </Link>
        </div>

        {/* Icons (Only if Logged In) */}

        <div className="flex items-center gap-4">
          <Link to="/account" className="text-white text-xl">
            <FaUser />
          </Link>
          <Link to="/cart" className="relative text-white text-xl">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-red-500 text-white border border-white rounded-full text-[10px]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
