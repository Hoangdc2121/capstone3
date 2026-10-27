import { api } from "./api/axios";

const orderApi = {
  createOrder: (data) => {
    return api.post(`/Users/order`, data);
  },
};

export default orderApi;
