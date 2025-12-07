import React from "react";

const PaymentSuccess = () => {

  // Example: If you already stored user in localStorage after payment  
  const user = JSON.parse(localStorage.getItem("userData"));

  const tx = user?.transaction;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600 text-center">
        🎉 Payment Successful
      </h1>

      <p className="text-center mt-4 text-lg text-gray-700">
        Your Premium Membership has been activated.
      </p>

      {/* ==== TABLE ==== */}
      {tx ? (
        <div className="overflow-x-auto max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded-xl">

          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b">Field</th>
                <th className="py-3 px-4 border-b">Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">Transaction ID</td>
                <td className="py-3 px-4 border-b">{tx.id}</td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b">Amount</td>
                <td className="py-3 px-4 border-b">${tx.amount}</td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b">Currency</td>
                <td className="py-3 px-4 border-b uppercase">{tx.currency}</td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b">Paid At</td>
                <td className="py-3 px-4 border-b">
                  {new Date(tx.paidAt).toLocaleString()}
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b">Premium Activated</td>
                <td className="py-3 px-4 border-b">
                  {new Date(user?.premiumAt).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-600">Loading data...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
