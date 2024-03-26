import './App.css';
import React, { useState } from 'react';
import { Button, DatePicker } from 'antd';
import 'antd/dist/reset.css'; 
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import Pagination from './Pagination';
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

export default function App () {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Home />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();
  const products = [
    {
      name: "Meta quest2 VR headset",
      description: "The Meta Quest 3 is a virtual reality (VR) headset that uses mixed reality technology to provide new experiences. It was released in October 2023, and is the successor to the Quest 2. The Quest 3 has a higher-resolution display, faster processor, and more advanced passthrough capabilities than the Quest 2. It also has a slimmer design, with 40% thinner lenses and optic profile than the Quest 2.",
      category: "category 1",
      price: 299,
      stockQuantity: 100,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "LunaBloom",
      description: "Inspirational novel",
      category: "Books",
      price: 29.99,
      stockQuantity: 200,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "SwiftFlare",
      description: "Stylish running shoes",
      category: "Clothing",
      price: 39.99,
      stockQuantity: 300,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "EchoRise",
      description: "Smart home assistant",
      category: "Home & Kitchen",
      price: 49.99,
      stockQuantity: 400,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "QuantumQuake",
      description: "Energy drink",
      category: "Beverages",
      price: 2.99,
      stockQuantity: 1000,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "ZeniGlow",
      description: "Anti-aging skincare serum",
      category: "Beauty",
      price: 59.99,
      stockQuantity: 150,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "SwiftFlare",
      description: "Stylish running shoes",
      category: "Clothing",
      price: 39.99,
      stockQuantity: 300,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "EchoRise",
      description: "Smart home assistant",
      category: "Home & Kitchen",
      price: 49.99,
      stockQuantity: 400,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "QuantumQuake",
      description: "Energy drink",
      category: "Beverages",
      price: 2.99,
      stockQuantity: 1000,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    {
      name: "ZeniGlow",
      description: "Anti-aging skincare serum",
      category: "Beauty",
      price: 59.99,
      stockQuantity: 150,
      imageLink: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    }
  ];

  const handleClick = (product) => {
    return(
      navigate('/products', product)
    );
  }
  return (
    <div style={{ padding: '0 24px' }}>
      <h1>My Ant Design App</h1>

        <div className='product-list'>
        {products.map((product) =>
          <ProductCard product={product} onClick={() => handleClick(product)}/>
        )}
      </div>
      
      <Pagination />
    </div>
  );
}

