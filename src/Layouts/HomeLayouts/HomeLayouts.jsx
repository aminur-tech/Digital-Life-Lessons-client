import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Component/Header/Navbar';
import Footer from '../../Component/Footer/Footer';

const HomeLayouts = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayouts;