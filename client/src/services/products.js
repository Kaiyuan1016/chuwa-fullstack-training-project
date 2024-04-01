import apiCall from './api';

export const createProduct = async (product) => {
  return await apiCall({
    url: '/api/products',
    method: 'POST',
    data: product
  });
};

export const updateProduct = async ({productId, updatedData}) => {
    return await apiCall({
      url: `/api/products/${productId}`,
      method: 'PUT',
      data: updatedData
    });
};

export const fetchProducts = async ({sortBy='createTime', sortOrder='asc', page=1, pageSize=10}) => {
  return await apiCall({
    url: `/api/products?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`,
    method: 'GET',
  });
};

export const fetchProductById = async (productId) => {
    return await apiCall({
      url: `api/products/${productId}`,
      method: 'GET'
    });
};

export const deleteMessage = async (productId) => {
  console.log(productId);
  return await apiCall({
    url: `/api/products/${productId}`,
    method: 'DELETE'
  });
};