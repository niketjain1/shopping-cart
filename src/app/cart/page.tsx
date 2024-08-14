"use client";

import { useCart } from "@/lib/cartContext";
import React, { useState } from "react";
import CartItem from "@/components/CartItem";

const Cart = () => {
  const { cart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal - appliedDiscount;

  const applyDiscount = () => {
    if (discountCode === "SAVE10") {
      setAppliedDiscount(subtotal * 0.1);
    } else {
      alert("Invalid discount code");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-2xl font-serif text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className="border p-2 mr-2"
              />
              <button
                onClick={applyDiscount}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
            {appliedDiscount > 0 && (
              <p className="text-green-600">
                Discount applied: ${appliedDiscount.toFixed(2)}
              </p>
            )}
            <p className="text-xl font-bold mt-2">Total: ${total.toFixed(2)}</p>
            <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
