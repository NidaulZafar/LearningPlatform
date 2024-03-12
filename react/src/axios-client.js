// axios-client.js
import axios from 'axios';


const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, withCredentials: true, withXSRFToken: true, headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use((config) => {

  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})


axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN');
  } else if (response.status === 403) {
    console.log("403");
  } else if (response.status === 404) {
    console.log(response)
    console.log("404");
  }
  throw error;
})

export default axiosClient;
