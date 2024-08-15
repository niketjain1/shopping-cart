"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../lib/cartContext";
import { motion } from "framer-motion";
import Image from "next/image";
import CheckoutForm from "@/components/CheckoutForm";

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart, getTotalQuantity, clearCart } = useCart();

  // States to manage form data
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  // Function to place the order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 2000);
  };

  // Function to update the form data state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Used this to show the order placed message with the animation
  if (isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <motion.div
          initial={{ x: 200 }}
          animate={{ x: -180, opacity: 0 }}
          transition={{ duration: 2 }}
          className="mb-4"
        >
          <span
            role="img"
            aria-label="delivery truck"
            style={{ fontSize: "50px" }}
          >
            🚚
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 text-green-600"
        >
          Your order has been placed!
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 border-purple-200 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
      <div className="flex flex-col-reverse lg:flex-row lg:space-x-8">
        <div className="lg:w-2/3 bg-gradient-to-br from-white to-indigo-100 border border-indigo-100 rounded-lg p-6 lg:mt-0 mt-4 lg:mb-0">
          {/* Checkout form component for form data */}
          <CheckoutForm
            formData={formData}
            handleInputChange={handleInputChange}
            handlePlaceOrder={handlePlaceOrder}
          />
        </div>
        <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-white to-indigo-100 border border-indigo-100 rounded-lg p-6 shadow-md sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h2>
            <div className="max-h-72 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center mb-4 space-x-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-700 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalQuantity()} items):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg text-gray-700 mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
