import API from './axiosInstance'

export const fetchOrders = () => API.get('/orders')
export const updateOrders = (id, data) => API.patch(`orders/${id}`, data);