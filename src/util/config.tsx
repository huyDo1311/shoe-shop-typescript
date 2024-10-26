import axios, { AxiosHeaders } from "axios";
import { createBrowserHistory } from "history";
export const DOMAIN = "https://shop.cyberlearn.vn/";

export const history = createBrowserHistory();

export const ACCESS_TOKEN: string = "accessToken";
export const USER_LOGIN: string = "userLogin";

//cấu hình các hàm get set storgate cũng như cookie

export const settings = {
  setStorageJson: (name: string, data: any): void => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(name, jsonData);
  },
  setStorage: (name: string, data: string): void => {
    localStorage.setItem(name, data);
  },
  getStorageJson: (name: string): any | undefined => {
    if (localStorage.getItem(name)) {
      const dataStore: string | undefined | null = localStorage.getItem(name);
      if (typeof dataStore === "string") {
        const data = JSON.parse(dataStore);
        return data;
      }
      return undefined;
    }
    return;// undefined;
  },
  getStore: (name: string): string | null | undefined | any => {
    if (localStorage.getItem(name)) {
      const data: string | null | undefined = localStorage.getItem(name);
      return data;
    }
    return undefined;
  },
  clearStorage: (name:string ) => {
    localStorage.removeItem(name);
  },
  setCookieJson: (name: string, value: any, days: number): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      JSON.stringify(value)
    )};expires=${expires.toUTCString()};path=/`;
    // var expires = "";
    // if(days){
    //   var date = new Date();
    //   date.getTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //   expires = "; expires=" + date.toUTCString();
    // }
    // value = JSON.stringify(value);
    // document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookieJson: (name: string): any => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";"); // Tách cookie thành mảng

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      // Bỏ qua khoảng trắng đầu chuỗi
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }

      // Nếu tìm thấy cookie với tên tương ứng
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length); // Trả về giá trị của cookie
      }
    }

    return null; // Trả về null nếu không tìm thấy
  },
  eraseCookie: (name: string): void => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  },
};

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MSIsIkhldEhhblN0cmluZyI6IjE0LzAzLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0MTkxMDQwMDAwMCIsIm5iZiI6MTcxNDA2NDQwMCwiZXhwIjoxNzQyMDU4MDAwfQ.aL6UU86iw9qfiazPYi9hHV3FjYthitqZbK5pBfChSiU",
    Authorization:
      "bearer " + settings.getStore(ACCESS_TOKEN),
  },
});

//http.interceptors.request
http.interceptors.request.use((config) => {


  const accessToken = settings.getStore(ACCESS_TOKEN);
    
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: accessToken,
      };
    }


  return config;
},(error) =>{
  return Promise.reject(error);
})




//http.interceptors.response
http.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response?.status === 400 || error.response?.status === 404) {
      history.push("/");
    }

    return Promise.reject(error);
  }
);
