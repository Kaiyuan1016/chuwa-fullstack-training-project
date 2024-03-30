import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

import { addItemToCart, decrementItemQuantity } from './features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const AddToCartButton = ({product}) => {
  const dispatch = useDispatch();
  const[quantity, setQuantity] = useState(0);
  
  const handleAdd = () => {
    setQuantity(prev => prev+1);
    dispatch(addItemToCart({id: product._id, quantity: 1, productInfo: product}));
  };

  const handleDecrement = () => {
    if(quantity > 0) {
      setQuantity(prev => prev-1);
      dispatch(decrementItemQuantity({id: product._id, quantity: 1, productInfo: product}));
    }
  };

  return (
    <div>
      {quantity === 0 ? (
        <Button onClick={handleAdd} className='add-button button-base'>Add</Button>
      ) : (
        <div>
          <Button onClick={handleDecrement} type='text'>-</Button>
          <span style={{ margin: '0 5px' }}>{quantity}</span>
          <Button onClick={handleAdd} type='text'>+</Button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
