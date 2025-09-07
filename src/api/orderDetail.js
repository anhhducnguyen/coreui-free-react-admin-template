import API from './axiosInstance'

export const fetchOrderDetails = () => API.get('/order-details')
