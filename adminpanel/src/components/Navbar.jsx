import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { logout, token } = useContext(ShopContext);

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        <img
          src="/path/to/logo.png"
          alt="Logo"
          className="h-8 inline-block mr-2"
        />
        Shoe Store
      </div>
      {token && (
        <div className="flex items-center space-x-4">
          <img
            src="/path/to/user-icon.png"
            alt="User"
            className="h-8 w-8 rounded-full"
          />
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
