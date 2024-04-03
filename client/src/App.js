import './App.css';
import React from 'react';
import 'antd/dist/reset.css'; 
import { Routes, Route} from 'react-router-dom';

import ProductDetail from './ProductDetail';
import ProductsPage from './ProductsPage';
import ProductForm from './components/ProductForm';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import AuthLayout from './components/Layout/AuthLayout';
import NotFound from './pages/NotFound';
import SuccessPage from './pages/successPage';

export default function App () {
  return(
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route element={<AuthLayout/>}>
        <Route path='/products/edit/:productId' element={<ProductForm />} />
        <Route path='/products/edit/new' element={<ProductForm />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/forgotpassword/success' element={<SuccessPage />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/resetpassword/success' element={<SuccessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

