import { api } from "./api/axios";

const authApi = {
  signIn: (obj) => {
    return api.post("/Users/signin", obj);
  },

  signUp: (obj) => {
    return api.post("/Users/signup", obj);
  },

  getProfile: () => {
    return api.post("/Users/getProfile");
  },

  updateProfile: (obj) => {
    return api.post("/Users/updateProfile", obj);
  },

  getLike: (productId) => {
    return api.get(`/Users/like?productId=${productId}`);
  },

  getUnLike: (productId) => {
    return api.get(`/Users/unlike?productId=${productId}`);
  },

  // lấy ds sản phẩm yêu thích
  getFavoriteProducts: () => {
    return api.get("/Users/getproductfavorite");
  },
};

export default authApi;
