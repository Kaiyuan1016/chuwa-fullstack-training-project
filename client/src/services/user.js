import apiCall from "./api";

export const updateCart = async (userId, cartItems) => {
    return await apiCall({
        url: `api/user/${userId}/cart`,
        method: 'PUT',
        data: cartItems
    });
};

export const getCart = async (userId) => {
    return await apiCall({
        url: `api/user/${userId}/cart`,
        method: 'GET',
    });
};