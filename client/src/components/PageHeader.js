import React, { useState } from 'react';
import './PageHeader.css'; 
import { Input } from 'antd';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from './Cart';
import { useSelector } from 'react-redux';

const { Search } = Input;
const PageHeader = () => {
    const [cartVisible, setCartVisible] = useState(false);
    const cart = useSelector(state => state.cart.items);
    const itemCount = Array.isArray(cart) ? cart.reduce((total, item) => total += item.quantity, 0) : 0;
    const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total += item.productInfo.price * item.quantity, 0) : 0;

    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };
    return (
        <header className="page-header">
            <div className="logo"><span style={{fontWeight: '700', fontSize: '28px'}}>Management</span> <span style={{fontSize: '12px'}}>chuwa</span></div>
            <div style={{color: 'black', width: '528px', height: '48px', padding:'12px', border:'1px'}}>
                <Search placeholder='Search' buttonstyle={{ backgroundColor: 'white', border:'white'}} />
            </div>
            <div className="user-info">
                <div className="user-logo" style={{padding: '10px'}}>User Logo</div>
                <div className="cart-info">
                    <button
                        onClick={toggleCartVisibility}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: 0}}
                    >
                        <Badge color="secondary" badgeContent={itemCount}>
                            <ShoppingCartIcon />{" "}
                        </Badge>
                    </button>
                    <div className="cart-total-price">${totalPrice}</div>
                </div>
            </div>
            <Cart visible={cartVisible} onClose={toggleCartVisibility} />
        </header>
    );
}

export default PageHeader;
