import axios  from "axios";


const userConnection=axios.create({
    // baseURL: process.env.NEXT_USER_API_URL || 'http://localhost:8000'
        baseURL: "https://kazuha-closet-ubzf.onrender.com"
});

userConnection.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    // Skip token attachment for auth endpoints
    const excludedPaths = ['/api/login/', '/api/register/'];
    const isExcluded = excludedPaths.some((path) => config.url?.includes(path));
    console.log(token)
    if (token && !isExcluded) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default userConnection;