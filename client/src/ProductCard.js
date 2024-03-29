import React from 'react';
import './index.css';
import AddButton from './AddButton';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        return navigate(`/products/${id}`)
    };

    const handleEdit = (id) => {
        return navigate(`/products/edit/${id}`);
    };

    return (
        <div className="card">
                <img
                    className="card-img-top"
                    src={product.imageLink}
                    alt="Product"
                    onClick={() => handleClick(product._id)}
                />
                <div className='info-container'>
                    <div className="card-text" style={{fontSize:'14px', color: '#6B7280'}}>{product.name}</div>
                    <div style={{fontStyle: 'inter', fontSize: '16px', fontWeight: '600'}}>${product.price}</div>
                </div>
                <div className='button-list'>
                    <AddButton />
                    <button className="btn edit-button button-base" onClick={() => handleEdit(product._id)}>Edit</button>
                </div>
            
        </div>
);}

export default ProductCard;