import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Login from './Login';
const Layout = () => {
  const {user,loading} = useSelector((state) => state.auth);
  if(loading){
    return <Loader/>
  }
  return (
    <div>
      {
        user?(
    <div className="min-vh-100 bg-light">
      <Navbar/>
      <Outlet/>
    </div>
  ):<Login/>
      }
    </div>
  );
};

export default Layout;
