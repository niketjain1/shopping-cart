"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cartContext";

const Header = () => {
  const { getTotalQuantity } = useCart();

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          E-Commerce Store
        </Link>
        <Link href="/cart" className="flex items-center">
          <ShoppingCartIcon className="h-6 w-6 mr-2" />
          <span>Cart ({getTotalQuantity()})</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
