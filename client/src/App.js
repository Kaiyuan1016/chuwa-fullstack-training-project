import './App.css';
import React from 'react';
import 'antd/dist/reset.css'; 

import ProductDetail from './ProductDetail';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductsPage from './ProductsPage';
import ProductForm from './components/ProductForm';

export default function App () {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/products/edit/:productId' element={<ProductForm />} />
        <Route path='/products/edit/new' element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

