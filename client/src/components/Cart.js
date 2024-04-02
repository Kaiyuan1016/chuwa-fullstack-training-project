import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import AddToCartButton from './AddButton';
import { removeItemFromCart } from '../features/cart/cartSlice';
import { updateCartInDatabase } from "../features/userSlice";

const Cart = ({ visible, onClose }) => {

	const cart = useSelector(state => state.cart.items);
    const itemCount = Array.isArray(cart) ? cart.reduce((total, item) => total += item.quantity, 0) : 0;
	const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total += item.productInfo.price * item.quantity, 0) : 0;
    const dispatch = useDispatch();
  
	const handleRemove = (productId) => {
		dispatch(removeItemFromCart({id: productId}))
		dispatch(updateCartInDatabase({"cart": cart}));
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
				<input placeholder='20 DOLLAR OFF' style={{width: '351px'}}/>
				<button className='add-button btn'>Apply</button>
			</div>
		</div>
        <div>Total: ${totalPrice}</div>
		<footer><button className='add-button btn'>Continue to checkout</button></footer>
      </div>
    </Modal>
  );
};

export default Cart;
