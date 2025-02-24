import axios from 'axios';
import { TODO_SERVER_URL } from '../config-global';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: TODO_SERVER_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  add_item: '/api/tasks/add',
  get_items: '/api/tasks/all',
};
