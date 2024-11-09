import axios from "axios";

// export const backendServer =`http://localhost:3000`;
// export const backendServer =`http://192.168.137.140:3000`;
export const backendServer = `https://gps-nfk0.onrender.com`;
const axiosInstance = axios.create({
  withCredentials: true,
});
axiosInstance.defaults.withCredentials = true;
export { axiosInstance };
export const backendUrl = backendServer;
export const signinApi = `${backendServer}/signin`;
export const signupApi = `${backendServer}/signup`;
export const searchApi = `${backendServer}/search`;
export const fecthApi = `${backendServer}/fetch`;
export const deleteApi = `${backendServer}/delete`;
export const addApi = `${backendServer}/add`;
export const logoutApi = `${backendServer}/auth/logout`;

