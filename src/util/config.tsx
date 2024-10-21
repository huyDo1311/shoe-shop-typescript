import axios from "axios";
import { createBrowserHistory } from "history";
export const DOMAIN = 'https://shop.cyberlearn.vn/';

export const history = createBrowserHistory()

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
});

//http.interceptors.request






//http.interceptors.response
http.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },(error) => {
    
    if(error.response?.status === 400 || error.response?.status === 404) {
        history.push('/');
    }


    return Promise.reject(error);
  });


