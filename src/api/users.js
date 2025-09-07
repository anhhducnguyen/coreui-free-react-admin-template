// import axios from 'axios';
// import { data } from 'react-router-dom';

// const API_URL = 'https://website-selling-cosmetics-v4.onrender.com/api/v1/users';

// export const fetchUsers = () => axios.get(API_URL);
// export const createUser = () => axios.post(API_URL, data);
// export const deleteUsers = () => axios.delete(`${API_URL}/${id}`);

import API from './axiosInstance'

export const fetchUsers = () => API.get('/users')
export const createUser = (data) => API.post('/users', data)
export const deleteUser = (id) => API.delete(`/users/${id}`)
