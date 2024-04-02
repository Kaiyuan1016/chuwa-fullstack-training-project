import './App.css';
import React from 'react';
import 'antd/dist/reset.css'; 
import { Routes, Route} from 'react-router-dom';

import ProductDetail from './pages/ProductDetailPage/ProductDetail';
import ProductsPage from './pages/ProductsPage';
import ProductForm from './components/ProductForm';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
// import UpdatePassword from './pages/UpdatePassword';
import AuthLayout from './components/Layout/AuthLayout';
import NotFound from './pages/NotFound';

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
        {/* <Route path='/updatepassword' element={<UpdatePassword/>} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

