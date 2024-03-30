import './App.css';
import React from 'react';
import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 

import ProductDetail from './ProductDetail';
import ProductsPage from './ProductsPage';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import UpdatePassword from './pages/UpdatePassword';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("user")) {
      const token = JSON.parse(localStorage.getItem("user")).token;
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

const isAuthenticated = () => {
  return localStorage.getItem("user");
};

const ProtectedRoute = ({ element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to="/" />;
};

const isAdmin = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return auth?.role === "admin";
};

const AdminRoute = ({ element: Element }) => {
  return isAdmin() ? <Element /> : <Navigate to="/" replace />;
};

export default function App () {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/updatepassword' element={<UpdatePassword/>} />
      </Routes>
    </BrowserRouter>
  );
}
