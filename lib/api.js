import axios from 'axios';

//instance Axios yang dikonfigurasi
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Accept': 'application/json'
  }
});

export const csrfHandshake = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error("CSRF Handshake failed:", error);
  }
};

export default api;