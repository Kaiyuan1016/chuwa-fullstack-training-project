import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectProductById } from "./features/product/productsSlice";
import { useSelector } from "react-redux";

const ProductDetail = () => {
    const {productId} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const product = useSelector((state) => selectProductById(state, productId));

    useEffect(() => {
        if(product) {
            setIsLoading(false);
        }
    }, [product]);

    if(!product) {
        return <div>Loading...</div>;
    }

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