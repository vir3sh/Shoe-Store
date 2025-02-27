import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between px-6 md:px-16 py-10">
      {/* Left Section - Delivery Information */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          DELIVERY <span className="font-light">INFORMATION</span>
        </h2>
        <form className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name"
            className="input-field p-2  border-[1.25px]"
          />
          <input
            type="text"
            placeholder="Last name"
            className="  border-[1.25px] p-2 input-field"
          />
          <input
            type="email"
            placeholder="Email address"
            className="input-field col-span-2 border-[1.25px] p-2"
          />
          <input
            type="text"
            placeholder="Street"
            className="input-field col-span-2 border-[1.25px] p-2"
          />
          <input
            type="text"
            placeholder="City"
            className="input-field border-[1.25px] p-2 "
          />
          <input
            type="text"
            placeholder="State"
            className="input-field border-[1.25px] p-2"
          />
          <input
            type="text"
            placeholder="Zipcode"
            className="input-field border-[1.25px] p-2"
          />
          <input
            type="text"
            placeholder="Country"
            className="input-field border-[1.25px] p-2"
          />
          <input
            type="text"
            placeholder="Phone"
            className="input-field col-span-2 border-[0.10px] p-2"
          />
        </form>
      </div>

      {/* Right Section - Cart Totals & Payment */}
      <div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          CART <span className="font-light">TOTALS</span>
        </h2>
        <div className="mb-6">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>$10.00</p>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <p>Total</p>
            <p>$0.00</p>
          </div>
        </div>

        {/* Payment Method */}
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          PAYMENT <span className="font-light">METHOD</span>
        </h2>
        <div className="flex gap-4 mb-6">
          <button
            className={`payment-button ${
              paymentMethod === "stripe" ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setPaymentMethod("stripe")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Stripe_logo%2C_revised_2016.svg/1920px-Stripe_logo%2C_revised_2016.svg.png"
              alt="Stripe"
              className="h-6"
            />
          </button>
          <button
            className={`payment-button ${
              paymentMethod === "razorpay" ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setPaymentMethod("razorpay")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/5/5f/Razorpay_logo.svg"
              alt="Razorpay"
              className="h-6"
            />
          </button>
          <button
            className={`payment-button ${
              paymentMethod === "cash" ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setPaymentMethod("cash")}
          >
            <span className="text-lg">💵</span> Cash on Delivery
          </button>
        </div>

        {/* Place Order Button */}

        <button
          onClick={() => navigate("/orders")}
          className="bg-black text-white py-3 px-6 w-full text-lg font-semibold hover:bg-gray-800"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
