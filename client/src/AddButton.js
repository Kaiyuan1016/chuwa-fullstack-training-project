import React, { useState } from 'react';
import { Button } from 'antd';

const AddToCartButton = () => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Button onClick={quantity > 0 ? null : handleAdd} className='add-button button-base'>
      {quantity === 0 ? 'Add' : (
        <>
          <Button onClick={handleRemove} type='text'>-</Button>
          <span style={{ margin: '0 5px' }}>{quantity}</span>
          <Button onClick={handleAdd} type='text'>+</Button>
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
