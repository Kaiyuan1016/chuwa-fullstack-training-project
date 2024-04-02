import apiCall from "./api";

export const validatePromoCode = async (promoCode) => {
    return await apiCall({
        url:'api/promo/validate',
        method: 'POST',
        data: promoCode
    });
};