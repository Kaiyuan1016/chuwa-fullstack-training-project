import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state;
    return(
        <div>
            <h2>Product Detail</h2>
            <div className="product-detail-container">
                <img className="detail-img" src={product.imageLink}/>
                <div>
                    <p style={{color: '#6B7280'}}>{product.category}</p>
                    <h2 style={{color: '#535353'}}>{product.name}</h2>
                    <h2>${product.price}</h2>
                    <p>{product.description}</p>
                    <div className="detail-btn-list">
                        <button className="btn add-button">Add To Cart</button>
                        <button className="btn edit-button btn-outline-secondary">Edit</button>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default ProductDetail;