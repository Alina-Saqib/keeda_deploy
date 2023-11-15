import axios from 'axios';

let token: string = '';
if (typeof localStorage !== 'undefined') {
  const storedToken = localStorage.getItem('token');
  if (storedToken !== null) {
    token = storedToken;
  }
}
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : 'http://16.16.58.118:4000/';

const api = axios.create({
  baseURL,
  // timeout: 1000,
  headers: {
    'X-Custom-Header': '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
    Authorization: `Bearer ${token}`,
  },
});

export default api;
