import React from 'react'
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div>
        <Navbar />
        <div className='min-h-[80vh]'>
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout