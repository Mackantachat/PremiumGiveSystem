import axios from "axios";

const authDownloadService = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  //withCredentials: true,
  // headers: {
  //   "Content-type": "application/x-www-form-urlencoded",
    
  // },
  responseType: 'arraybuffer',
});

export default authDownloadService;