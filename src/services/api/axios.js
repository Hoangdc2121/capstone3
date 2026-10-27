import axios from "axios";

export const api = axios.create({
  baseURL: "https://apistore.cybersoft.edu.vn/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a request interceptor
// gửi đi
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("accessToken");
    const pathname = config.url?.split("?")[0];

    const requiresAuth = [
      "/Users/getProfile",
      "/Users/like",
      "/Users/unlike",
      "/Users/getproductfavorite",
      "/Users/updateProfile",
    ].includes(pathname);
    // (config.url, accessToken);

    // ("👉 config", config);
    if (requiresAuth && accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
// nhận kết quả từ API
api.interceptors.response.use(
  function (response) {
    // thành công thì cấu hình trong này - đầu 2
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // thất bại đầu 4xx, 5xx
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 401 , 403 => xóa accessToken và đá ra login
    const statusCode = error.response?.status;
    if (statusCode == 401 || statusCode == 403) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
