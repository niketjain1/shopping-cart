import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="border rounded-lg p-4 flex flex-col bg-white shadow-lg transition-transform duration-300 transform hover:translate-y-[-10px] hover:cursor-pointer"
        onClick={openModal}
      >
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
      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-xl max-h-xl h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {product.title}
                  </Dialog.Title>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-cover mt-4 w-full h-56 mb-4 rounded-lg"
                  />
                  <div className="mt-2">
                    <p className="body-base-regular text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-gray-600 m-2 text-center">
                    ${product.price.toFixed(2)}
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full">
                    Add to Cart
                  </button>
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
