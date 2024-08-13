import { Product } from "@/types";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col bg-white">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="object-cover w-full h-48 mb-4 rounded-lg"
      />
      <h2 className="text-lg font-semibold mb-2 text-gray-500">
        {product.title}
      </h2>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-auto hover:bg-blue-600 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
