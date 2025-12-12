import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PricingPage = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user = {}, isLoading, isError } = useQuery({
    queryKey: ['user', authUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/premium/${authUser.email}`);
      return res.data;
    },
    enabled: !!authUser?.email
  });

  if (!authUser)
    return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Please log in to see pricing.</p>;
  if (isLoading)
    return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Loading...</p>;
  if (isError)
    return <p className="text-center mt-20 text-red-500 dark:text-red-400">Failed to load user data.</p>;

  if (user?.isPremium) {
    return <p className="text-center mt-20 text-yellow-500 dark:text-yellow-400">🌟 You are already Premium!</p>;
  }

  const handleUpgrade = async () => {
    try {
      const res = await axiosSecure.post('/create-checkout-session', {
        userId: authUser._id,
        email: authUser.email
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error('Stripe checkout error:', err);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-gray-100 dark:bg-gray-900 min-h-screen rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Upgrade to Premium
      </h1>

      <table className="table-auto w-full border border-gray-200 dark:border-gray-700 mb-6 text-gray-800 dark:text-gray-200">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <tr>
            <th className="border px-4 py-2">Feature</th>
            <th className="border px-4 py-2">Free</th>
            <th className="border px-4 py-2">Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Number of Lessons</td>
            <td className="border px-4 py-2">8</td>
            <td className="border px-4 py-2">Unlimited</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Premium Lesson Creation</td>
            <td className="border px-4 py-2">❌</td>
            <td className="border px-4 py-2">✅</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Ad-Free Experience</td>
            <td className="border px-4 py-2">❌</td>
            <td className="border px-4 py-2">✅</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Priority Listing</td>
            <td className="border px-4 py-2">❌</td>
            <td className="border px-4 py-2">✅</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Support</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Priority</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Access to Premium Resources</td>
            <td className="border px-4 py-2">❌</td>
            <td className="border px-4 py-2">✅</td>
          </tr>
        </tbody>
      </table>

      <div className="text-center">
        <button
          onClick={handleUpgrade}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition"
        >
          Upgrade to Premium (৳1500)
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
