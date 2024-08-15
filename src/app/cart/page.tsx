"use client";

import { useCart } from "@/lib/cartContext";
import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { toast } from "react-toastify";
import OrderSummary from "@/components/OrderSummary";

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
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="lg:w-4/5">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:w-1/3 md:w-full md:p-10 p-4 lg:p-3 md:mt-0">
            <OrderSummary
              subtotal={subtotal}
              appliedDiscount={appliedDiscount}
              total={total}
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              applyDiscount={applyDiscount}
              isApplyDisabled={isApplyDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
