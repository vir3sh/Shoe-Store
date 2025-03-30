import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import products from "./Orders";
import { ShopContext } from "../context/ShopContext";
const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const cartItem = useContext(ShopContext);
  const { products, delivery_fee, currency, getCartTotal } =
    useContext(ShopContext);

  const subtotal = getCartTotal();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  // console.log(cartItem);

  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const onChangerHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let orderItem = [];
  //     console.log("pro", products);

  //     for (const items in cartItem) {
  //       for (const item in cartItem[items]) {
  //         if (cartItem[items][item] > 0) {
  //           const itemInfo = structuredClone(
  //             products.find((product) => product._id === items)
  //           );
  //           if (itemInfo) {
  //             itemInfo.size = item;
  //             itemInfo.quantity = cartItem[items][item];
  //             orderItem.push(itemInfo);
  //           }
  //         }
  //       }
  //     }

  //     console.log(orderItem);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!cartItem || !cartItem.cartItem) {
        console.log("Cart Items are missing or undefined.");
        return;
      }

      let orderItems = [];

      console.log("Products from Context:", products);
      console.log("Cart Items:", cartItem.cartItem);

      Object.keys(cartItem.cartItem).forEach((productId) => {
        Object.keys(cartItem.cartItem[productId]).forEach((size) => {
          if (cartItem.cartItem[productId][size] > 0) {
            const itemInfo = products.find(
              (product) => String(product._id) === productId
            );

            if (itemInfo) {
              orderItems.push({
                ...itemInfo,
                size,
                quantity: cartItem.cartItem[productId][size],
              });
            }
          }
        });
      });

      console.log("Final Order Items:", orderItems);

      if (orderItems.length === 0) {
        console.log("No valid items in the order.");
        return;
      }

      // Proceed with sending order data to backend or further processing.
    } catch (error) {
      console.log("Error while processing order:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-16 py-10">
        {/* Left Section - Delivery Information */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            DELIVERY <span className="font-light">INFORMATION</span>
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              required
              type="text"
              name="firstName"
              placeholder="First name"
              className="input-field p-2  border-[1.25px]"
              onChange={onChangerHandler}
              value={formData.firstName}
            />
            <input
              required
              name="lastName"
              type="text"
              placeholder="Last name"
              className="  border-[1.25px] p-2 input-field"
              onChange={onChangerHandler}
              value={formData.lastName}
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email address"
              className="input-field col-span-2 border-[1.25px] p-2"
              onChange={onChangerHandler}
              value={formData.email}
            />
            <input
              required
              type="text"
              name="street"
              placeholder="Street"
              className="input-field col-span-2 border-[1.25px] p-2"
              onChange={onChangerHandler}
              value={formData.street}
            />
            <input
              required
              name="city"
              type="text"
              placeholder="City"
              className="input-field border-[1.25px] p-2 "
              onChange={onChangerHandler}
              value={formData.city}
            />
            <input
              required
              name="state"
              type="text"
              placeholder="State"
              className="input-field border-[1.25px] p-2"
              onChange={onChangerHandler}
              value={formData.state}
            />
            <input
              required
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              className="input-field border-[1.25px] p-2"
              onChange={onChangerHandler}
              value={formData.zipcode}
            />
            <input
              required
              name="country"
              type="text"
              placeholder="Country"
              className="input-field border-[1.25px] p-2"
              onChange={onChangerHandler}
              value={formData.country}
            />
            <input
              required
              name="phone"
              type="text"
              placeholder="Phone"
              className="input-field col-span-2 border-[0.10px] p-2"
              onChange={onChangerHandler}
              value={formData.phone}
            />
            <button
              type="submit"
              className="bg-black text-white py-3 px-6 w-full text-lg font-semibold hover:bg-gray-800"
            >
              PLACE ORDER
            </button>
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
              <p>
                {currency} {subtotal}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>
                {currency} {delivery_fee}
              </p>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <p>Total</p>
              <p>
                {" "}
                {currency} {total}
              </p>
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
                paymentMethod === "razorpay"
                  ? "border-black"
                  : "border-gray-300"
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
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
