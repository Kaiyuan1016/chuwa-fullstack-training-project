import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { selectProductById, fetchProductByIdAction } from "../../features/product/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import './ProductDetail.css';

const ProductDetail = () => {
    const {productId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const status = useSelector(state => state.products.status);
    const product = useSelector(state => state.products.product);
    const error = useSelector(state => state.products.error);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProductByIdAction(productId))
        .then(() => setIsLoading(false))
        .catch(err => console.error('Error fetching product by id', err));
    }, [ dispatch, productId]);

    const handleEdit = (id) => {
        return navigate(`/products/edit/${id}`);
    };

    if(isLoading || status === 'pending') {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return(
        <div className="product-detail-wrapper">
            <h4 className="product-title">Product Detail</h4>
            <div className="product-detail-container">
                <img className="detail-img" src={product.imageLink} alt="Product" />
                <div className="detail-info">
                    <p className="product-category">{product.category}</p>
                    <h2 className="product-name">{product.name}</h2>
                    <div className="price-container">
                        <h4 className="product-price">${product.price}</h4>
                        {product.stockQuantity < 1 && <button className="out-of-stock-btn">Out of Stock</button>}
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="detail-btn-list">
                        <button className="btn detail-button-base add-button">Add To Cart</button>
                        {isAuthenticated && (
                            <button className="btn detail-button-base edit-button" onClick={() => handleEdit(product._id)}>Edit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;