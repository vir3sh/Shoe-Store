import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <img src="/path/to/logo.png" alt="Logo" className="h-8" />
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} Shoe Store. All rights reserved.
          </p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm">Contact us: info@shoestore.com</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
