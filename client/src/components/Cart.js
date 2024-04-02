import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import AddToCartButton from './AddButton';
import { removeItemFromCart } from '../features/cartSlice';
import { updateCartInDatabase } from "../features/cartSlice";

import axios from 'axios';

const Cart = ({ visible, onClose }) => {
	const [inputValue, setInputValue] = useState('');
	const [invalidPromo, setInvalidPromo] = useState(false);
	const [discount, setDiscount] = useState(1);
	const cart = useSelector(state => state.cart.items);
    const itemCount = Array.isArray(cart) > 0? cart.reduce((total, item) => total += item.quantity, 0) : 0;
	const totalPrice = Array.isArray(cart) > 0 ? cart.reduce((total, item) => total += item.productInfo.price * item.quantity, 0) : 0;
    const dispatch = useDispatch();
  
	const handleRemove = (productId) => {
		dispatch(removeItemFromCart({id: productId}))
		dispatch(updateCartInDatabase());
	};
	const handlePromoCode = async () => {
		const response = await axios.post('http://localhost:8080/api/promo/validate', {promoCode: inputValue});
		if(!response.data.isValid) {
			setInvalidPromo(true);
		} else {
			const discountRate = response.data.discount / 100;
			setDiscount(discountRate);
		}
	};
	
	return (
    <Modal
		open={visible}
		onCancel={onClose}
		footer={null}
		centered={false}
		closable={true}
		width={542}
		style={{ position:'absolute', top: 20, right: 20 }}
    >
      <div>
		<header style={{backgroundColor: '#5048E5'}}>
			<h4 style={{fontSize:'32px', display:'flex', left:0,}}>Cart({itemCount})</h4>
		</header>
        <div style={{overflow: 'auto'}}>
			{cart?.map((item) => (
				<div key={item.id} style={{display: 'flex', flexDirection: 'row', width: '460px', height:'120px', gap:'10px', marginBottom: '10px'}}>
					<img style={{width:'112px', height:'120px'}} src={item.productInfo.imageLink} />
					<div style={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
						<div style={{display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
							<div>{item.productInfo.name}</div>
							<div>{item.productInfo.price}</div>
						</div>
						<div style={{display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
							<AddToCartButton product={item.productInfo} />
							<a href="#" onClick={() => handleRemove(item.id)} style={{textDecoration: 'underline' }}>remove</a>
						</div>
					</div>
				</div>
			))}
		</div>
		<div>
			<p>Apply Discount Code</p>
			<div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between' }}>
				<input placeholder='SAVE20' value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{width: '351px'}}/>
				<button className='add-button btn' onClick={handlePromoCode}>Apply</button>
			</div>
			{invalidPromo ? <p style={{color: 'red'}}>Invalid Promo Code</p>
			: <></>}
		</div>
		<div>
        	<div style={{display:'flex', justifyContent:'space-between'}}><span>Subtotal</span> <span>${totalPrice.toFixed(2)}</span></div>
        	<div style={{display:'flex', justifyContent:'space-between'}}><span>Tax</span> <span>${(totalPrice * 0.1).toFixed(2)}</span></div>
			{discount!==1 && !invalidPromo ?  
			<div style={{display:'flex', justifyContent:'space-between'}}><span>Discount</span> <span>-${(totalPrice * discount).toFixed(2)}</span></div>
			: <></>}
			<div style={{display:'flex', justifyContent:'space-between'}}><span>Estimated total</span> <span>${(totalPrice * (1-0.1-discount)).toFixed(2)}</span></div>
		</div>
		<footer><button className='add-button btn'>Continue to checkout</button></footer>
      </div>
    </Modal>
  );
};

export default Cart;
