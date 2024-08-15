import React from "react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/lib/cartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const totalAmount = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-300 py-4 p-4 m-3 rounded-md">
      <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
        <Image
          src={item.image}
          alt={item.title}
          width={80}
          height={80}
          className="object-cover w-16 h-16 rounded-lg mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end flex-grow">
        <div className="flex items-center justify-center mr-4 sm:mr-6">
          <button
            onClick={() =>
              updateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
            className="bg-gray-300 px-2 py-1 rounded text-gray-700 hover:bg-gray-400"
            disabled={item.quantity === 1}
          >
            -
          </button>
          <span className="mx-2 text-gray-700">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-300 px-2 py-1 rounded text-gray-700 hover:bg-gray-400"
          >
            +
          </button>
        </div>
        <div className="text-right text-gray-700 mr-4 sm:mr-6">
          <p className="font-semibold">${totalAmount.toFixed(2)}</p>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Remove item"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
