import axios from 'axios'

const API_URL = 'https://website-selling-cosmetics-v4.onrender.com/api/v1/product-lines';

export const fetchProductLines = () => axios.get(API_URL);
export const createProductLine = (data) => axios.post(API_URL, data);
export const deleteProductLine = (id) => axios.delete(`${API_URL}/${id}`);
