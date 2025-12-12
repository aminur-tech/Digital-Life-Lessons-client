import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUser, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch users
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Toggle user role (admin <-> user)
    const toggleRole = async (id) => {
        await axiosSecure.patch(`/users/role/${id}`);
        refetch(); 
    };



    // Delete user
    const deleteUser = async (id) => {
        await axiosSecure.delete(`/users/${id}`);
        refetch();
    };

    return (
        <div className="overflow-x-auto">
            <title>Manage Users</title>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Total Lessons</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.displayName || user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.totalLessons || 0}</td>
                            <td className="flex gap-2">
                                {user.role !== 'admin' ? (
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => toggleRole(user._id)}
                                        title="Promote to Admin"
                                    >
                                        <FaUserShield />
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => toggleRole(user._id)}
                                        title="Demote to User"
                                    >
                                        <FaUser />
                                    </button>
                                )}
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => deleteUser(user._id)}
                                    title="Delete User"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
