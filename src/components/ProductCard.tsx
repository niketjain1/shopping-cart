import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Stars from "./Stars";
import { useCart } from "@/lib/cartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="border rounded-lg p-4 flex flex-col bg-white shadow-lg transition-transform duration-300 transform hover:translate-y-[-10px] hover:cursor-pointer">
        <div onClick={openModal}>
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
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-auto hover:bg-blue-600 transition-colors"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    {product.title}
                  </Dialog.Title>
                  <div className="flex flex-col items-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain h-56 mb-4 rounded-lg"
                    />
                    <p className="text-gray-600 text-xl font-semibold mb-2">
                      ${product.price}
                    </p>
                    <Stars rating={product.rating.rate} />
                    <p className="text-sm text-gray-500 mt-1">
                      {product.rating.rate} ratings
                    </p>
                    <div className="mt-4 w-full">
                      <h4 className="text-md font-semibold mb-2 text-gray-600">
                        Description:
                      </h4>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-6 w-44 items-center">
                      <button
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProductCard;
