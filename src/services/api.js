import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.sistemaevolutioclinica.com.br',
});

export default api;
