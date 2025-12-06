import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PricingPage = () => {
    const { user: authUser } = useAuth();
    const axiosSecure = useAxiosSecure();
  

    // Fetch user data from backend
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['user', authUser?._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${authUser._id}`);
            return res.data;
        },
        enabled: !!authUser?._id
    });

    if (!authUser) return <p className="text-center mt-20">Please log in to see pricing.</p>;
    if (isLoading) return <p className="text-center mt-20">Loading...</p>;
    if (isError) return <p className="text-center mt-20">Failed to load user data.</p>;

    if (user.isPremium) {
        return <p className="text-center mt-20 text-yellow-500">🌟 You are already Premium!</p>;
    }

    // Upgrade to premium
    const handleUpgrade = async () => {
        try {
            const res = await axiosSecure.post('/create-checkout-session', { userId: authUser._id });
            window.location.href = res.data.url; // Redirect to Stripe Checkout
        } catch (err) {
            console.error('Stripe checkout error:', err);
            alert('Failed to initiate payment. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Upgrade to Premium</h1>

            <table className="table-auto w-full border border-gray-200 mb-6">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Feature</th>
                        <th className="border px-4 py-2">Free</th>
                        <th className="border px-4 py-2">Premium</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border px-4 py-2">Number of Lessons</td><td className="border px-4 py-2">5</td><td className="border px-4 py-2">Unlimited</td></tr>
                    <tr><td className="border px-4 py-2">Premium Lesson Creation</td><td className="border px-4 py-2">❌</td><td className="border px-4 py-2">✅</td></tr>
                    <tr><td className="border px-4 py-2">Ad-Free Experience</td><td className="border px-4 py-2">❌</td><td className="border px-4 py-2">✅</td></tr>
                    <tr><td className="border px-4 py-2">Priority Listing</td><td className="border px-4 py-2">❌</td><td className="border px-4 py-2">✅</td></tr>
                    <tr><td className="border px-4 py-2">Support</td><td className="border px-4 py-2">Basic</td><td className="border px-4 py-2">Priority</td></tr>
                    <tr><td className="border px-4 py-2">Access to Premium Resources</td><td className="border px-4 py-2">❌</td><td className="border px-4 py-2">✅</td></tr>
                </tbody>
            </table>

            <div className="text-center">
                <button
                    onClick={handleUpgrade}
                    className="btn btn-primary rounded-xl px-6 py-2 text-white"
                >
                    Upgrade to Premium (৳1500)
                </button>
            </div>
        </div>
    );
};

export default PricingPage;
