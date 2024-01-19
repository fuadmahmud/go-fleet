import axios from 'axios';

const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 60000,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_BEARER_TOKEN
  }
});

export default fetch;
