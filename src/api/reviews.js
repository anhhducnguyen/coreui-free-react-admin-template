import axios from 'axios';

const API_URL = 'https://website-selling-cosmetics-v4.onrender.com/api/v1/reviews';

export const fetchReviews = () => axios.get(API_URL);