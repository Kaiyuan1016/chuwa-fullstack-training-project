import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'antd';

import { addItemToCart, decrementItemQuantity } from './features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const AddToCartButton = ({product}) => {
  const dispatch = useDispatch();
  const item = useSelector(state => 
    state.cart.items.find(item => item.id === product._id),
    (left, right) => left?.quantity === right?.quantity
  );
  
  const[quantity, setQuantity] = useState(item ? item.quantity : 0);

  useEffect(() => {
    if(item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(0);
    }
  }, [item]);
  
  const handleAdd = useCallback(() => {
    dispatch(addItemToCart({id: product._id, quantity: 1, productInfo: product}));
  }, [dispatch, product]);

  const handleDecrement = useCallback(() => {
    if(quantity > 0) {
      dispatch(decrementItemQuantity({id: product._id, quantity: 1, productInfo: product}));
    }
  },[dispatch, product, quantity]);

  return (
    <div>
      {quantity < 1 ? (
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
