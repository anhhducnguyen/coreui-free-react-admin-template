import axios from 'axios'
import { data } from 'react-router-dom';

const API_BASE_URL = 'https://website-selling-cosmetics-v4.onrender.com/api/v1/products';

// const API_URL = 'https://website-selling-cosmetics-v4.onrender.com/api/v1/products';
const API_URL = `${API_BASE_URL}?page=1&limit=100`;

export const fetchProducts = () => axios.get(API_URL);
export const createProduct = (data) => axios.post(API_BASE_URL, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/${id}`);