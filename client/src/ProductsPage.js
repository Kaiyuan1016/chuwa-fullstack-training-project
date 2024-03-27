import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductPagination from './Pagination';
import ProductCard from './ProductCard';

import { fetchProducts } from './features/product/productsSlice';

function ProductsPage() {
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);
    
    
    const productsPerPage = 10;
    
    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchProducts());
        } else if(status === 'succeeded') {
            setInitialDisplayedProducts();
            
        }
    }, [status, dispatch]);
    
    const setInitialDisplayedProducts = () => {
        const startIdx = (currentPage - 1) * productsPerPage;
        const endIdx = startIdx + productsPerPage;
        const productsForPage = products.slice(startIdx, endIdx);
        setDisplayedProducts(productsForPage);
    }
    
    const handlePageChange = useCallback((page) => {
        const startIdx = (page - 1) * productsPerPage;
        const endIdx = startIdx + productsPerPage;
        const productsForPage = products.slice(startIdx, endIdx);
        setDisplayedProducts(productsForPage);
        setCurrentPage(page);
    }, [products, productsPerPage]);

    if(status === 'loading') {
        return <div>Loading...</div>
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>
    }

    return (
      <div style={{ top: '128px', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: '700'}}>
            <h4>Products</h4>
        </div>
          <div className='product-list'>
          {displayedProducts?.map((product) =>
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