import axios from 'axios';
import { TODO_SERVER_URL } from '../config-global';


// ----------------------------------------------------------------------

// Creating an axios instance with a predefined base URL
const axiosInstance = axios.create({ baseURL: TODO_SERVER_URL });

// Adding an interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (res) => res,// Pass successful responses directly
  (error) => 
        // Reject with specific error response data or a default message
    Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

// Fetcher function to simplify GET requests

export const fetcher = async (args) => {
  // Supports both string URL and array format [url, config]
  const [url, config] = Array.isArray(args) ? args : [args];

  // Make a GET request and return the response data
  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

// API endpoints for task management

export const endpoints = {
  add_item: '/api/tasks/add',          // Endpoint to add a new task
  get_items: '/api/tasks/all',         // Endpoint to fetch all tasks
  mark_as_done: '/api/tasks/mark-as-done', // Endpoint to mark a task as completed
};
