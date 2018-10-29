import axios from 'axios';

// TODO change PREFIX_API_URL to development server
let PREFIX_API_URL = 'https://asani-backend-app.herokuapp.com/';
// let PREFIX_API_URL = 'http://localhost:8080';

if (process.env.NODE_ENV === 'production') {
  PREFIX_API_URL = 'https://asani-backend-app.herokuapp.com/';
}

export const api = axios.create({
  baseURL: PREFIX_API_URL,
});
