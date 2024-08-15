import React from "react";
import FormInput from "./FormInput";

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface CheckoutFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlaceOrder: (e: React.FormEvent) => void;
}

// Component for filling the form data on the Checkout page
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  handleInputChange,
  handlePlaceOrder,
}) => {
  return (
    <form onSubmit={handlePlaceOrder} className="space-y-4">
      <FormInput
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <FormInput
        label="Address"
        name="address"
        type="text"
        value={formData.address}
        onChange={handleInputChange}
      />
      <div className="flex space-x-4">
        <div className="flex-1">
          <FormInput
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <FormInput
            label="Postal Code"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <FormInput
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
