import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthContext';


const useAuth = () => {
    const userInfo = useContext(AuthContext)
    return userInfo;
};

export default useAuth;