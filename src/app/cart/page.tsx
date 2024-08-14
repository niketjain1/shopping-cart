"use client";

import { useCart } from "@/lib/cartContext";
import React, { useState } from "react";
import CartItem from "@/components/CartItem";
import Link from "next/link";

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
      setDiscountCode("");
    } else {
      alert("Invalid discount code");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 font-serif">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:w-4/5">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="md:w-1/3 mt-6 p-3 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Order Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2 text-gray-700">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  className="border p-2 w-full mb-2 text-gray-700"
                />
                <button
                  onClick={applyDiscount}
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
                >
                  Apply Discount
                </button>
              </div>
              <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 w-full hover:bg-green-600 transition-colors">
                Proceed to Checkout
              </button>
              <Link className="" href="/">
                <button className="bg-teal-500 text-white px-6 py-2 rounded mt-4 w-full hover:bg-teal-600 transition-colors">
                  Back to cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
