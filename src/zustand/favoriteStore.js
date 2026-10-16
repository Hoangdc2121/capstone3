import authApi from "@/services/authService";
import { notifyError } from "@/utils/notification";
import { create } from "zustand";

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Không thể cập nhật yêu thích.";

const useFavorite = create((set, get) => ({
  favoriteProducts: [],
  favoriteIds: [],
  favoritesLoading: false,
  favoritesError: null,

  getFavoriteProducts: async () => {
    set({
      favoritesLoading: true,
      favoritesError: null,
    });

    try {
      const res = await authApi.getFavoriteProducts();
      // Đối chiếu tên trường này với Response body thực tế
      const products = res.data.content.productsFavorite;
      if (!Array.isArray(products)) {
        throw new Error("Danh sách yêu thích không đúng cấu trúc.");
      }
      set({
        favoriteProducts: products,
        favoriteIds: products.map((product) => String(product.id)),
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ favoritesError: errorMessage });
      notifyError(errorMessage);
    } finally {
      set({ favoritesLoading: false });
    }
  },

  favoriteIds: [],
  loadingIds: [],
  favoriteError: null,

  getLike: async (productId) => {
    const id = String(productId);
    if (get().loadingIds.includes(id)) return;
    set((state) => ({
      loadingIds: [...state.loadingIds, id],
      favoriteError: null,
    }));

    try {
      const res = await authApi.getLike(productId);
      set((state) => ({
        favoriteIds: state.favoriteIds.includes(id)
          ? state.favoriteIds
          : [...state.favoriteIds, id],
      }));
      return res.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ favoriteError: errorMessage });
      notifyError(errorMessage);
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter((item) => item !== id),
      }));
    }
  },

  getUnLike: async (productId) => {
    const id = String(productId);
    if (get().loadingIds.includes(id)) return;
    set((state) => ({
      loadingIds: [...state.loadingIds, id],
      favoriteError: null,
    }));

    try {
      const res = await authApi.getUnLike(productId);
      set((state) => ({
        favoriteIds: state.favoriteIds.filter((item) => item !== id),
      }));
      return res.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ favoriteError: errorMessage });
      notifyError(errorMessage);
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter((item) => item !== id),
      }));
    }
  },

  resetFavorites: () => {
    set({
      favoriteIds: [],
      favoriteError: null,
    });
  },
}));

export default useFavorite;
