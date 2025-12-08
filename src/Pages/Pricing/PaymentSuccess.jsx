import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const [tx, setTx] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .get(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data)
        setTx(res.data.transaction);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching payment details!");
        setLoading(false);
      });
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading payment details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-xl text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600 text-center">
        🎉 Payment Successful
      </h1>

      <p className="text-center mt-4 text-lg text-gray-700">
        Your Premium Membership has been activated.
      </p>

      {/* ==== TABLE ==== */}
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
              <td className="py-3 px-4 border-b">{tx?.id}</td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b">Amount</td>
              <td className="py-3 px-4 border-b">${tx?.amount}</td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b">Currency</td>
              <td className="py-3 px-4 border-b uppercase">
                {tx?.currency}
              </td>
            </tr>

            <tr>
              <td className="py-3 px-4 border-b">Paid At</td>
              <td className="py-3 px-4 border-b">
                {new Date(tx?.paidAt).toLocaleString()}
              </td>
            </tr>

          </tbody>
        </table>
        <div className="flex justify-items-center">
          <Link
          to="/"
          className="mt-10 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
