import axios from "axios";
// export const backendServer = `http://localhost:3000`;
// export const backendServer =`https://4858-117-250-157-213.ngrok-free.app`;
// ->add your local ip for local testing --no slash
export const backendServer = `https://gps-nfk0.onrender.com`;
const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
export { axiosInstance };
export const backendUrl = backendServer;
export const signinApi = `${backendServer}/signin`;
export const signupApi = `${backendServer}/signup`;
export const searchApi = `${backendServer}/search`;
export const fecthApi = `${backendServer}/fetch`;
export const deleteApi = `${backendServer}/delete`;
export const addApi = `${backendServer}/add`;
export const logoutApi = `${backendServer}/logout`;
export const signinApiGoogle = `${backendServer}/auth/google`;
export const GoogleSignApi = `${backendServer}/google/callback`;
