import axios from 'axios';

// import axios from 'axios';
// import { API_KEY } from './youtube';

const timeout = 600000;
/** @type {import('axios').AxiosInstance} */
const axiosInstance = axios.create({ baseURL: '/', timeout });

/**
 * @param {string} url
 * @param {import('axios).AxiosRequestConfig} config
 * @returns
 */
const get = (url, config) => {
  return axiosInstance.get(url, config).then(response => response.data);
};

/**
 *
 * @param {string} url
 * @param {object} data
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */

const post = (url, data, config) => {
  return axiosInstance.post(url, data, config).then(response => response.data);
};

const client = {
  get,
  post,
  getRaw: axiosInstance.get,
  delete: axiosInstance.delete,
  postRaw: axiosInstance.post,
  put: axiosInstance.put,
  patch: axiosInstance.patch,
  request: axiosInstance.request,
};

export default client;