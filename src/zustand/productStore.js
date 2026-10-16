import productApi from "@/services/productService";
import { notifyError } from "@/utils/notification";
import { create } from "zustand";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Không thể tải dữ liệu";
const useProductStore = create((set, get) => ({
  products: [],
  pageSize: 10,
  pageIndex: 1,
  keywords: "",
  totalRow: 0,

  productsLoading: false,
  productsError: null,

  getProducts: async (searchKeywords) => {
    set({
      productsLoading: true,
      productsError: null,
    });
    try {
      const { pageIndex, pageSize, keywords } = get();
      const res = await productApi.getPaging(
        pageIndex,
        pageSize,
        searchKeywords ?? keywords,
      );
      console.table(
        res.data.content.items.map((product) => ({
          name: product.name,
          image: product.image,
        })),
      );
      set({
        products: res.data.content.items,
        totalRow: res.data.content.totalRow,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ productsError: errorMessage });
      notifyError(errorMessage);
      console.log("👉 err", error);
    } finally {
      set({ productsLoading: false });
    }
  },

  setPageIndex: (pageIndex) => {
    set({ pageIndex });
  },

  setPageSize: (pageSize) => {
    set({ pageSize });
  },
  setKeyWord: (keywords) => {
    set({ keywords });
  },

  //   toàn bộ sản phẩm
  // dùng để hiển thị và lọc danh mục

  allProducts: [],
  allProductsLoading: false,
  allProductsError: null,

  getAllProducts: async () => {
    set({
      allProductsLoading: true,
      allProductsError: null,
    });

    try {
      const res = await productApi.getAll();
      set({ allProducts: res.data.content });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ allProductsError: errorMessage });
      notifyError(errorMessage);
    } finally {
      set({ allProductsLoading: false });
    }
  },

  //   danh mục
  // dùng để tạo các nút chọn danh mục
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  getCategories: async () => {
    set({
      categoriesLoading: true,
      categoriesError: null,
    });

    try {
      const res = await productApi.getCategoryApi();
      console.log("👉 res", res);

      set({
        categories: res.data.content,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      set({ categoriesError: errorMessage });
      notifyError(errorMessage);
    } finally {
      set({ categoriesLoading: false });
    }
  },

  //   sản phẩm nổi bật
  featuredProducts: [],
  featuredProductsLoading: false,
  featuredProductsError: null,

  getFeaturedProducts: async () => {
    set({
      featuredProductsLoading: true,
      featuredProductsError: null,
    });

    try {
      const res = await productApi.getByFeature(true);
      set({
        featuredProducts: res.data.content,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ featuredProductsError: errorMessage });
      notifyError(errorMessage);
    } finally {
      set({ featuredProductsLoading: false });
    }
  },

  //   chi tiết sản phẩm
  productDetail: null,
  productDetailLoading: false,
  productDetailError: null,

  getProductById: async (id) => {
    // Xóa chi tiết cũ trước khi tải sản phẩm khác
    set({
      productDetail: null,
      productDetailLoading: true,
      productDetailError: null,
    });

    try {
      const res = await productApi.getProducById(id);
      set({
        productDetail: res.data.content,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ productDetailError: errorMessage });
      notifyError(errorMessage);
    } finally {
      set({ productDetailLoading: false });
    }
  },
}));
export default useProductStore;
