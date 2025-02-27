import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { delivery_fee, currency, getCartTotal } = useContext(ShopContext);
  const subtotal = getCartTotal();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto">
      <Title text1={"Cart"} text2={"Total"} />

      <div className="mt-4 space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-700 font-medium">Subtotal</p>
          <p className="text-gray-900 font-semibold">
            {currency} {subtotal}.00
          </p>
        </div>

        {/* Shipping Fee */}
        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-700 font-medium">Shipping Fee</p>
          <p className="text-gray-900 font-semibold">
            {currency} {delivery_fee}
          </p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold text-gray-900">
          <p>Total</p>
          <p>
            {currency} {total}
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => navigate("/place-order")}
        className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;
