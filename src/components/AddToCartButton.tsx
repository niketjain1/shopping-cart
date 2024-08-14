import React, { useEffect, useState } from "react";
import { useCart } from "../lib/cartContext";
import { Product } from "@/types";
import { ShoppingCartIcon, CubeIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, updateQuantity, cart, removeFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (quantity > 0) {
      setIsAdded(true);
    }
  }, [quantity]);

  const handleAddToCart = () => {
    setClicked(true);
    setTimeout(() => {
      if (!isAdded) {
        addToCart(product);
        setIsAdded(true);
        setClicked(false);
      }
    }, 1500);
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
        <motion.button
          onClick={handleAddToCart}
          className={`cart__button relative w-[200px] h-[62px] rounded-[10px] bg-purple-600 text-white text-lg font-medium overflow-hidden transition duration-300 ease-in-out ${
            clicked ? "scale-90" : ""
          }`}
          whileHover={{ backgroundColor: "hsl(250, 57%, 53%)" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute z-20 top-1/2 left-[-10%] transform -translate-x-1/2 -translate-y-1/2"
            animate={clicked ? { left: "110%" } : { left: "-10%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <ShoppingCartIcon className="h-8 w-8" />
          </motion.div>
          <motion.span
            className="absolute left-1/2 z-30 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 1 }}
            animate={clicked ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            Add to Cart
          </motion.span>
          <motion.span
            className="absolute left-1/2 z-30 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
            animate={clicked ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            Added
          </motion.span>
        </motion.button>
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
