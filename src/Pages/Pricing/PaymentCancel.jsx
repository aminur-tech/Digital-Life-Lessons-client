// PaymentCancel.jsx
import React from "react";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="mt-4 text-gray-700">
        No worries! You can try again anytime.
      </p>
    </div>
  );
};

export default PaymentCancel;
