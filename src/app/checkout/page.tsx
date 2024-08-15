"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../lib/cartContext";
import { motion } from "framer-motion";
import Image from "next/image";

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart, getTotalQuantity, clearCart } = useCart();
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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    <div className="container mx-auto px-4 py-8 bg-gray-50 rounded-lg flex md:flex-row flex-col">
      <div className="w-full flex-1 bg-gray-200 rounded-lg p-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Checkout</h1>
        <div className="flex flex-col lg:flex-row lg:space-x-6 w-full">
          <div className="lg:w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Order Details
            </h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block shadow-lg p-1 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 p-1 block shadow-lg w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="mt-1 p-1 text-black  shadow-lg block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="mt-1 block p-1 w-full text-black rounded-md border-gray-300 shadow-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    className="mt-1 block w-full p-1 rounded-md text-black border-gray-300 shadow-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 p-1 block w-full rounded-md text-black border-gray-300 shadow-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 mt-6 lg:mt-0">
        <div className="bg-gray-200 ml-4 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <Image
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md mr-4"
                width={200}
                height={200}
              />
              <div>
                <h3 className="font-semibold text-gray-700">{item.title}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({getTotalQuantity()} items):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-gray-700">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
