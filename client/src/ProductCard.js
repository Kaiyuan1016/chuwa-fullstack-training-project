import React from 'react';
import './index.css';
import AddButton from './AddButton';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        // console.log(id);
        return(
          navigate(`/products/${id}`)
        );
    }

    // if(!product) {
    //     return <div>Loading...</div>;
    // }

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
                    <button className="btn edit-button button-base">Edit</button>
                </div>
            
        </div>
);}

export default ProductCard;