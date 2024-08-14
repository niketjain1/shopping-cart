import React, { useEffect, useState } from "react";
import { useCart } from "../lib/cartContext";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, updateQuantity, cart, removeFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (quantity > 0) {
      setIsAdded(true);
    }
  }, [quantity]);

  const handleAddToCart = () => {
    if (!isAdded) {
      addToCart(product);
      setIsAdded(true);
    }
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      // Remove from cart if quantity becomes 0
      removeFromCart(product.id);
      setIsAdded(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-auto w-full">
      {!isAdded ? (
        <button
          onClick={handleAddToCart}
          className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors w-full"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center bg-gray-100 rounded w-full justify-between">
          <button
            onClick={handleDecreaseQuantity}
            className="px-3 py-1 text-xl font-bold text-blue-500 hover:bg-gray-200 rounded-l"
          >
            -
          </button>
          <span className="px-3 py-1 text-gray-700">{quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="px-3 py-1 text-xl font-bold text-blue-500 hover:bg-gray-200 rounded-r"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
