import React from 'react';
import './index.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Avatar, Card, Button } from 'antd';

const ProductCard = ({product}) => (
    <div className="card" style={{ width: '18rem' }}>
        <div className="image-container">
            <img
                className="card-img-top"
                src={product.imageLink}
                alt="Product"
            />
            <p className="card-text" style={{color: 'grey'}}>{product.name}</p>
            <h5 className="card-title">${product.price}</h5>
            <div className='button-list'>
                <a href="#" className="btn add-button btn-block">Add</a>
                <a href="#" className="btn btn-outline-secondary btn-block">Edit</a>
            </div>
        </div>
    </div>
);

export default ProductCard;