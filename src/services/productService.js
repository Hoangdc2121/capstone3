import { api } from "./api/axios";

//  # Hàm gọi API sản phẩm và danh mục
const productApi = {
  // lấy tất cả sản phẩm
  getAll: () => {
    return api.get(`/Product`);
  },

  // Lấy sản phẩm theo trạng thái nổi bật
  getByFeature: (feature = true) => {
    return api.get(`/Product/getProductByFeature?feature=${feature}`);
  },

  // lấy ra ds category
  getCategoryApi: () => {
    return api.get(`/Product/getAllCategory`);
  },

  //   lấy sản phẩm có phân trang
  getPaging: (pageIndex = 1, pageSize = 10, keywords = "") => {
    return api.get(
      `/Product/getpaging?pageIndex=${pageIndex}&pageSize=${pageSize}&keywords=${encodeURIComponent(keywords)}`,
    );
  },

  //   lấy chi tiết sản phẩm
  getProducById: (id) => {
    return api.get(`/Product/getbyid?id=${id}`);
  },
};

export default productApi;
