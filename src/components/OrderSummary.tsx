import React from "react";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  appliedDiscount: number;
  total: number;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  applyDiscount: () => void;
  isApplyDisabled: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  appliedDiscount,
  total,
  discountCode,
  setDiscountCode,
  applyDiscount,
  isApplyDisabled,
}) => {
  return (
    <div className="bg-gray-50 md:p-4 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Order Summary
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-700">Subtotal:</span>
          <span className="text-gray-700">${subtotal.toFixed(2)}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-${appliedDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg border-t pt-2 text-gray-700">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter discount code"
          className="border p-2 w-full mb-2 text-gray-700"
        />
        <button
          onClick={applyDiscount}
          disabled={isApplyDisabled}
          className={`w-full px-4 py-2 rounded transition-colors ${
            isApplyDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Apply Discount
        </button>
      </div>
      <Link href="/checkout">
        <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 w-full hover:bg-green-600 transition-colors">
          Proceed to Checkout
        </button>
      </Link>
      <Link href="/">
        <button className="bg-teal-500 text-white px-6 py-2 rounded mt-4 w-full hover:bg-teal-600 transition-colors">
          Back to cart
        </button>
      </Link>
    </div>
  );
};

export default OrderSummary;
