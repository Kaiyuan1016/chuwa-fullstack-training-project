import React, { useEffect, useState } from 'react';
import { PictureOutlined } from '@ant-design/icons'; // Import PictureOutlined icon
import {
  Button,
  Form,
  Input,
  InputNumber,
} from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction, createProductAction, fetchProductByIdAction } from '../features/product/productsSlice';

const { TextArea } = Input;

const ProductForm = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const status = useSelector(state => state.products.status);
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
    const[imageUrl, setImageUrl] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const isEditRoute = Object.keys(params).length !== 0;

    let productId;
    if(isEditRoute) {
        productId = params.productId;
    }

    const [updatedData, setUpdatedData] = useState({
       name:'',
       description: '',
       category: '',
       price: 0,
       stockQuantity: 0,
       imageLink: ''
    });

    useEffect(() => {
        if(isEditRoute) {
            dispatch(fetchProductByIdAction(productId))
            .then(() => {
                setIsLoading(false)}
            )
            .catch(err => console.error('Error fetching product by id', err));
        }
    }, [isEditRoute]);
    
    useEffect(() => {
        if (isEditRoute && product) {
            setUpdatedData(product);
            setImageUrl(product.imageLink);
        }
    }, [isEditRoute, product]);

    if(isEditRoute && isLoading) {
        return <div>Loading...</div>
    }

    const handleUpload = () => {
        setImageUrl(updatedData.imageLink);
    };

    const handleSubmit = async () => {
        if(isEditRoute) {
            await dispatch(updateProductAction({productId, updatedData}));
        } else {
            await dispatch(createProductAction(updatedData));
        }
        navigate(-1);
    };

    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <h4>{isEditRoute ? 'Edit Product' : 'Create Product'}</h4> 
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '660px',
                height: '839px',
                top: '20%',
                left: '25%',
                position: 'relative',
                backgroundColor: '#ffffff',
                borderRadius: '4px',
                padding: '20px'
            }}>
        <Form layout="vertical">
            <Form.Item label="Product Name">
                <Input
                    value={updatedData.name}
                    style={{ width: '564px' }}
                    onChange={(e) => setUpdatedData({...updatedData, name: e.target.value})}
                />
            </Form.Item>
            <Form.Item label="Product Description">
                <TextArea
                    value={updatedData.description}
                    rows={4}
                    onChange={(e) => setUpdatedData({...updatedData, description: e.target.value})}
                />
            </Form.Item>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Form.Item label="Category">
                    <Input
                        value={updatedData.category}
                        style={{ width: '278px' }}
                        onChange={(e) => setUpdatedData({...updatedData, category: e.target.value})}
                    />
                </Form.Item>
                <Form.Item label="Price">
                    <InputNumber
                        value={updatedData.price}
                        style={{ width: '278px' }}
                        onChange={(value) => setUpdatedData({...updatedData, price: value})}
                    />
                </Form.Item>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Form.Item label="In Stock Quantity">
                    <InputNumber
                        value={updatedData.stockQuantity}
                        style={{width: '196px'}}
                        onChange={(value) => setUpdatedData({...updatedData, stockQuantity: value})}
                    />
                </Form.Item>
                <Form.Item label="Add Image Link">
                    <Input style={{width: '357px'}} value={updatedData.imageLink} onChange={e => setUpdatedData({...updatedData, imageLink: e.target.value})} />
                </Form.Item>
            </div>
            <Form.Item style={{ textAlign: 'right' }}>
                <Button className='add-button' onClick={handleUpload}>Upload</Button>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent:'center' }}>
            {imageUrl ? (
                <img src={imageUrl} alt="Product Preview" style={{ width: '388px', height:'200px', objectFit:'contain' }} />
            ) : (
                <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', flexDirection:'column', textAlign: 'center', border:'5px dotted #ccc', width: '388px', height:'200px', marginBottom:'20px' }}>
                <PictureOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                <p style={{color:'#6B7280'}}>Image Preview</p>
                </div>
            )}
            </div>
                <Button className='add-button' onClick={handleSubmit}>{isEditRoute ? 'Update Product' : 'Add Product'}</Button>
            </Form>
        </div>
    </div>
    );
};
export default ProductForm;
