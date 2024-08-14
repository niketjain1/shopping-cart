import React from "react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/lib/cartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center border-b border-gray-300 py-4 bg-gray-100 p-4 m-3 rounded-md">
      <Image
        src={item.image}
        alt={item.title}
        width={80}
        height={80}
        className="object-cover mr-4 w-16 h-16 rounded-lg"
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-700 ">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() =>
            updateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          className="bg-gray-200 px-2 py-1 rounded text-gray-700"
        >
          -
        </button>
        <span className="mx-2 text-gray-700">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 px-2 py-1 rounded text-gray-700"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="ml-4 text-red-500"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;
