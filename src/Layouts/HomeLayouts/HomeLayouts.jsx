import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Component/Header/Navbar';

const HomeLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayouts;