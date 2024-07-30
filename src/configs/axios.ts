import axios from 'axios';

const token = localStorage.getItem('token');

console.log({ token });
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${JSON.parse(token as string)}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = 'http://localhost:6969/';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
