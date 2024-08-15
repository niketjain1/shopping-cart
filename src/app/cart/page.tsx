"use client";

import { useCart } from "@/lib/cartContext";
import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isApplyDisabled, setIsApplyDisabled] = useState(true);
  const [discountType, setDiscountType] = useState<
    "fixed" | "percentage" | null
  >(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setIsApplyDisabled(discountCode.trim() === "");
  }, [discountCode]);

  const total = subtotal - appliedDiscount;

  const applyDiscount = () => {
    const fixedMatch = discountCode.match(/^(\d+(?:\.\d{1,2})?)\s*\$\s*off$/i);
    const percentageMatch = discountCode.match(
      /^(\d+(?:\.\d{1,2})?)\s*%\s*off$/i
    );

    if (fixedMatch) {
      const amount = parseFloat(fixedMatch[1]);
      if (amount > subtotal) {
        toast.error(
          "Invalid Code! Discount amount cannot be greater than the subtotal.",
          {
            position: "bottom-center",
          }
        );
        return;
      }
      setAppliedDiscount(amount);
      setDiscountType("fixed");
      setDiscountCode("");
    } else if (percentageMatch) {
      const percentage = parseFloat(percentageMatch[1]);
      if (percentage > 100) {
        toast.error(
          "Invalid Code! Discount percentage cannot be greater than 100%.",
          {
            position: "bottom-center",
          }
        );
        return;
      }
      const discountAmount = (subtotal * percentage) / 100;
      setAppliedDiscount(discountAmount);
      setDiscountType("percentage");
      setDiscountCode("");
    } else {
      toast.error("Invalid code!", {
        position: "bottom-center",
      });
      setDiscountCode("");
      setAppliedDiscount(0);
      setDiscountType(null);
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
                  disabled={isApplyDisabled}
                  className={`w-full px-4 py-2 rounded transition-colors ${
                    isApplyDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
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
