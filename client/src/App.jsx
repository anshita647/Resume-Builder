import React, { useEffect } from 'react';  
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import api from './configs/api';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { login, setLoading } from './app/features/authSlice';

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        } else {
          // Token exists but user not found
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
        }
      }
    } catch (error) {
      // Token invalid or server error
      localStorage.removeItem("token");
      toast.error("Authentication failed. Please login again.");
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
  {/* Public route */}
  <Route path="/" element={<Home />} />

  {/* ✅ PUBLIC Preview route */}
  <Route path="/app/view/:resumeid" element={<Preview />} />

  {/* Protected App layout */}
  <Route path="/app" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="builder/:resumeid" element={<ResumeBuilder />} />
  </Route>
</Routes>
    </>
  );
};

export default App;