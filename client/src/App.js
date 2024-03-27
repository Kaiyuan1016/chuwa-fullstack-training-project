import './App.css';
import React from 'react';
import 'antd/dist/reset.css'; 

import ProductDetail from './ProductDetail';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductsPage from './ProductsPage';

export default function App () {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

