import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    cartItem,
    products,
    addToCart,
    removeFromCart,
    getCartAmount,
    deleteFromCart,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        if (cartItem[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItem[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
    // console.log(getCartAmount);
  }, [cartItem]);

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <Title text1="Your" text2="Cart" />
        {cartData.length > 0 ? (
          <div className="space-y-6">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              return (
                <div
                  key={index}
                  className="flex items-center gap-6 p-4 border  shadow-md bg-white"
                >
                  <img
                    src={
                      productData?.images?.[0]
                        ? `http://localhost:5000/${productData.images[0]}`
                        : "placeholder.jpg"
                    }
                    alt={productData?.name || "Product"}
                    className="w-24 h-24 object-cover "
                  />

                  <div className="flex-1">
                    <p className="text-lg font-semibold">{productData?.name}</p>
                    <p className="text-gray-600 text-sm">Size: {item.size}</p>
                    <p className="text-gray-800 font-bold text-lg">
                      ₹{productData?.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                      onClick={() => removeFromCart(item._id, item.size)}
                    >
                      <FaMinus className="text-gray-700" />
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                      onClick={() => addToCart(item._id, item.size)}
                    >
                      <FaPlus className="text-gray-700" />
                    </button>
                  </div>

                  <button
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    onClick={() => deleteFromCart(item._id, item.size)}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}

            <CartTotal />
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-6">Your cart is empty.</p>
        )}
      </div>
      {/* <CartTotal /> */}
    </>
  );
};

export default Cart;
