import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

const ProductPagination = ({onPageChange }) => {
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if(storedPage) {
        setCurrent(parseInt(storedPage));
    }
  }, []);
  const onChange = (page) => {
    setCurrent(page);
    localStorage.setItem('currentPage', page);
    onPageChange(page);
  };
  return <Pagination current={current} onChange={onChange} total={50} />;
};
export default ProductPagination;