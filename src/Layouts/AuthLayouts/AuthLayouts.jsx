import React from 'react';
import Navbar from '../../Component/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';

const AuthLayouts = () => {
    return (
        <div className='w-full md:w-11/12 mx-auto p-1'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayouts;