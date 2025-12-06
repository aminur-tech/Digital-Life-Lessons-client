import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Component/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const{loading, user} = useAuth()
    const location = useLocation()
    // console.log('....', location)

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children
};

export default PrivateRoutes;