import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './Pagination';
import ProductCard from './ProductCard';
import { fetchProducts } from './features/product/productsSlice';
import { Select } from 'antd';

function ProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);
    const navigate = useNavigate();
    
    const pageSize = 10;

    useEffect(() => {
        // console.log('hey');
        if(status === 'idle') {
            dispatch(fetchProducts({page: localStorage.getItem('currentPage'), pageSize: pageSize, sortBy: localStorage.getItem('sortBy'), sortOrder: localStorage.getItem('sortOrder')}));
        }
        
    }, [status, dispatch]);
    
    const handlePageChange = useCallback((page) => {
        dispatch(fetchProducts({page: page, pageSize: pageSize, sortBy: localStorage.getItem('sortBy'), sortOrder: localStorage.getItem('sortOrder')}));
    }, []);

    const handleAddProduct = () => {
        navigate('/products/edit/new');
    };

    const sortProducts = (sortKey) => {
        console.log(sortKey);
        let sortBy, sortOrder;
        switch (sortKey) {
            case 'priceDesc':
                sortBy = 'price';
                sortOrder = 'desc';
                break;
            case 'priceAsc':
                sortBy = 'price';
                sortOrder = 'asc';
                break;
            case 'createTimeAsc':
                sortBy = 'createTime';
                sortOrder = 'desc';
                break;
            default:
                break;
        }
        localStorage.setItem('sortBy', sortBy);
        localStorage.setItem('sortOrder', sortOrder);
        // console.log(localStorage);
        dispatch(fetchProducts({sortBy, sortOrder, page: localStorage.getItem('currentPage'), pageSize: pageSize}));
    };

    if(status === 'pending') {
        return <div>Loading...</div>
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>
    }

    return (
      <div style={{ top: '128px', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'20px'}}>
            <h4>Products</h4>
            <div>
                <Select style={{width: '179px', height:'40px', marginRight:'20px'}} defaultValue='Sort' onChange={sortProducts}>
                    <Select.Option value="createTimeAsc">Last added</Select.Option>
                    <Select.Option value="priceAsc">Price: low to high</Select.Option>
                    <Select.Option value="priceDesc">Price: high to low</Select.Option>
                </Select>
                <button className='btn add-button' onClick={handleAddProduct}>Add Product</button> {/* Add credential ternary judgement*/}
            </div>
        </div>
          <div className='product-list'>
          {products.map((product) =>
            <ProductCard key={product._id} product={product}/>
          )}
        </div>
        
        <div style={{ alignSelf: 'flex-end', padding:'20px' }}>
            <ProductPagination onPageChange={handlePageChange}/>
        </div>
      </div>
    );
}

export default ProductsPage;