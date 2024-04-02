import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { selectProductById, fetchProductByIdAction } from "./features/productsSlice";
import { useDispatch, useSelector } from "react-redux";

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
        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <h2 className="h2">Product Detail</h2>
            <div className="product-detail-container" style={{width: '1323px', height:'682px', backgroundColor:'white', padding:'20px'}}>
            <img className="detail-img" src={product.imageLink} alt="ProductImage"/>
            <div className="detail-info">
                <p style={{color: '#6B7280'}}>{product.category}</p>
                <h2 style={{color: '#535353'}}>{product.name}</h2>
                <div 
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <h4 style={{ marginRight: '10px', marginBottom:'0px' }}>${product.price}</h4>
                    {product.stockQuantity < 1 ? <button className="out-of-stock-btn">Out of Stock</button> : <></>}
                </div>
                <p>{product.description}</p>
                <div className="detail-btn-list">
                    <button className="btn detail-button-base add-button">Add To Cart</button>
                    {isAuthenticated ?
                        <button className="btn detail-button-base edit-button" onClick={() => handleEdit(product._id)}>Edit</button>
                    : <></>}
                    
                </div>
            </div>
            </div>
        </div>    
    );
}

export default ProductDetail;