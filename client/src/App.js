import './App.css';
import React from 'react';
import 'antd/dist/reset.css'; 

import ProductDetail from './ProductDetail';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductsPage from './ProductsPage';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import UpdatePassword from './pages/UpdatePassword';
import Header from'./components/Header';
import Footer from'./components/Footer';


export default function App () {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/updatepassword' element={<UpdatePassword/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

