import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'antd';
import { updateCartInDatabase } from "../features/cartSlice";
import { addItemToCart, decrementItemQuantity, fetchCart } from '../features/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const AddToCartButton = ({product}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const userId = useSelector(state => state.user.user.id);
  const items = useSelector(state => state.cart.items);
  const item = useSelector(state => 
    state.cart.items.find(item => item.id === product._id),
    (left, right) => left?.quantity === right?.quantity
  );

  const[quantity, setQuantity] = useState(item ? item.quantity : 0);

  useEffect(() => {
    if(isAuthenticated && userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId])

  useEffect(() => {
    if(item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(0);
    }
  }, [item]);
  
  const handleAdd = useCallback(() => {
    dispatch(addItemToCart({id: product._id, quantity: 1, productInfo: product}));
    dispatch(updateCartInDatabase());
  }, [dispatch, product]);

  const handleDecrement = useCallback(() => {
    if(quantity > 0) {
      dispatch(decrementItemQuantity({id: product._id, quantity: 1, productInfo: product}));
      dispatch(updateCartInDatabase());
    }
  },[dispatch, product, quantity,]);

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
