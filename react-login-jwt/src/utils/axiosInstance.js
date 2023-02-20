import axios from 'axios';
let axiosInstance=axios.create({headers:{"authorization":localStorage.getItem("accessToken")}});
export default axiosInstance;